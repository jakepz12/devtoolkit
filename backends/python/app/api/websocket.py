from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict, Set
import json

router = APIRouter()

# Connection manager for WebSocket
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, retro_id: str):
        await websocket.accept()
        if retro_id not in self.active_connections:
            self.active_connections[retro_id] = set()
        self.active_connections[retro_id].add(websocket)

    def disconnect(self, websocket: WebSocket, retro_id: str):
        if retro_id in self.active_connections:
            self.active_connections[retro_id].discard(websocket)
            if not self.active_connections[retro_id]:
                del self.active_connections[retro_id]

    async def broadcast(self, message: dict, retro_id: str, exclude: WebSocket = None):
        if retro_id in self.active_connections:
            for connection in self.active_connections[retro_id]:
                if connection != exclude:
                    try:
                        await connection.send_json(message)
                    except:
                        pass

manager = ConnectionManager()


@router.websocket("/ws/retro/{retro_id}")
async def websocket_retro(websocket: WebSocket, retro_id: str):
    """WebSocket endpoint for real-time retro board updates."""
    await manager.connect(websocket, retro_id)

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            # Broadcast to all connected clients
            await manager.broadcast(
                {
                    "type": message.get("type", "message"),
                    "payload": message.get("payload", {}),
                    "sender": id(websocket),
                },
                retro_id,
                exclude=websocket,
            )

    except WebSocketDisconnect:
        manager.disconnect(websocket, retro_id)
        await manager.broadcast(
            {"type": "user_left", "payload": {"user_id": id(websocket)}},
            retro_id,
        )
