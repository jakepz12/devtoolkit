import uuid
import string
import random
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.utils.database import get_db
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()


def generate_share_code():
    """Generate a random share code for retro sessions."""
    chars = string.ascii_uppercase + string.digits
    return "".join(random.choices(chars, k=8))


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_retro(
    data: dict,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new retro session."""
    share_code = generate_share_code()

    # In a real app, save to database
    retro = {
        "id": str(uuid.uuid4()),
        "creator_id": str(current_user.id),
        "title": data.get("title", "Retro Session"),
        "template": data.get("template", "start_stop_continue"),
        "share_code": share_code,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
    }

    return retro


@router.get("/{retro_id}")
async def get_retro(
    retro_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a retro session."""
    # In a real app, fetch from database
    return {
        "id": retro_id,
        "title": "Retro Session",
        "template": "start_stop_continue",
        "is_active": True,
        "columns": [
            {"id": "1", "title": "Start", "cards": []},
            {"id": "2", "title": "Stop", "cards": []},
            {"id": "3", "title": "Continue", "cards": []},
        ],
    }


@router.post("/{retro_id}/cards")
async def add_card(
    retro_id: str,
    data: dict,
    db: AsyncSession = Depends(get_db),
):
    """Add a card to a retro session."""
    card = {
        "id": str(uuid.uuid4()),
        "column_id": data.get("column_id"),
        "content": data.get("content"),
        "author_session": data.get("session_id", "anonymous"),
        "votes": 0,
        "created_at": datetime.utcnow().isoformat(),
    }
    return card


@router.post("/{retro_id}/cards/{card_id}/vote")
async def vote_card(
    retro_id: str,
    card_id: str,
):
    """Vote for a card."""
    return {"card_id": card_id, "votes": 1}


@router.get("/{retro_id}/export/pdf")
async def export_pdf(retro_id: str):
    """Export retro results to PDF."""
    from reportlab.lib.pagesizes import A4
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet

    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(f"retro_{retro_id}.pdf", pagesize=A4)
    elements = []

    elements.append(Paragraph("Retro Session Results", styles["Heading1"]))
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("This is a placeholder PDF export.", styles["Normal"]))

    doc.build(elements)

    return {"message": "PDF generated", "filename": f"retro_{retro_id}.pdf"}
