import httpx
from readability import Document
from bs4 import BeautifulSoup


async def parse_article(url: str) -> dict:
    """Parse an article URL and extract clean content."""
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
        )
        response.raise_for_status()
        html = response.text

    # Extract clean content using readability
    doc = Document(html)
    title = doc.title()
    content_html = doc.summary()

    # Clean HTML to plain text
    soup = BeautifulSoup(content_html, "html.parser")
    clean_text = soup.get_text(separator="\n")

    # Extract author from meta tags
    soup_full = BeautifulSoup(html, "html.parser")
    author = None
    meta_author = soup_full.find("meta", attrs={"name": "author"})
    if meta_author:
        author = meta_author.get("content")

    # Count words and estimate reading time
    words = clean_text.split()
    word_count = len(words)
    reading_time = max(1, word_count // 200)  # ~200 words per minute

    return {
        "title": title,
        "content": clean_text[:50000],  # Limit content size
        "author": author,
        "word_count": word_count,
        "reading_time_minutes": reading_time,
    }
