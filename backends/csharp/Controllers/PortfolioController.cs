using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly AppDbContext _context;

    public PortfolioController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Portfolio>>> GetPortfolios()
    {
        return await _context.Portfolios
            .Include(p => p.Projects)
            .ToListAsync();
    }

    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Portfolio>> GetPortfolioBySlug(string slug)
    {
        var portfolio = await _context.Portfolios
            .Include(p => p.Projects)
            .FirstOrDefaultAsync(p => p.Slug == slug && p.IsPublic);

        if (portfolio == null)
            return NotFound();

        portfolio.ViewsCount++;
        await _context.SaveChangesAsync();

        return portfolio;
    }

    [HttpPost]
    public async Task<ActionResult<Portfolio>> CreatePortfolio(Portfolio portfolio)
    {
        _context.Portfolios.Add(portfolio);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPortfolioBySlug), new { slug = portfolio.Slug }, portfolio);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePortfolio(Guid id, Portfolio portfolio)
    {
        if (id != portfolio.Id)
            return BadRequest();

        _context.Entry(portfolio).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePortfolio(Guid id)
    {
        var portfolio = await _context.Portfolios.FindAsync(id);
        if (portfolio == null)
            return NotFound();

        _context.Portfolios.Remove(portfolio);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
