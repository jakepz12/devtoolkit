using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

[Table("articles")]
public class Article
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("user_id")]
    public Guid UserId { get; set; }

    [Required]
    [Column("url")]
    public string Url { get; set; } = string.Empty;

    [MaxLength(500)]
    [Column("title")]
    public string? Title { get; set; }

    [Column("content")]
    public string? Content { get; set; }

    [MaxLength(255)]
    [Column("author")]
    public string? Author { get; set; }

    [Column("word_count")]
    public int? WordCount { get; set; }

    [Column("reading_time_minutes")]
    public int? ReadingTimeMinutes { get; set; }

    [Column("is_read")]
    public bool IsRead { get; set; } = false;

    [Column("read_progress")]
    public float ReadProgress { get; set; } = 0;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("UserId")]
    public virtual User User { get; set; } = null!;
}
