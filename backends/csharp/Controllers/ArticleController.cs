using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ArticleController : ControllerBase
{
    private readonly AppDbContext _context;

    public ArticleController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
    {
        return await _context.Articles
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Article>> GetArticle(Guid id)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
            return NotFound();

        return article;
    }

    [HttpPost]
    public async Task<ActionResult<Article>> AddArticle(Article article)
    {
        // In production, parse the article content here
        _context.Articles.Add(article);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
    }

    [HttpPut("{id}/progress")]
    public async Task<IActionResult> UpdateProgress(Guid id, [FromBody] float progress)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
            return NotFound();

        article.ReadProgress = progress;
        if (progress >= 1.0f)
            article.IsRead = true;

        await _context.SaveChangesAsync();

        return Ok(article);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArticle(Guid id)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null)
            return NotFound();

        _context.Articles.Remove(article);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
