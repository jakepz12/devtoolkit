"use client";

import { Button } from "@/components/ui/button";

interface PDFExportProps {
  portfolio: {
    title: string;
    bio?: string;
    projects: Array<{
      title: string;
      description?: string;
      technologies?: string[];
    }>;
  };
}

export function PDFExport({ portfolio }: PDFExportProps) {
  const handleExport = () => {
    // In production, this would call the backend API to generate PDF
    // For now, we'll create a simple HTML to PDF conversion
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${portfolio.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #333; border-bottom: 2px solid #00f0ff; padding-bottom: 10px; }
          h2 { color: #666; margin-top: 30px; }
          .project { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
          .project h3 { margin: 0 0 10px 0; color: #333; }
          .project p { margin: 0; color: #666; }
          .tech { display: inline-block; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; margin-right: 5px; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>${portfolio.title}</h1>
        ${portfolio.bio ? `<p>${portfolio.bio}</p>` : ""}
        <h2>Projects</h2>
        ${portfolio.projects
          .map(
            (p) => `
          <div class="project">
            <h3>${p.title}</h3>
            ${p.description ? `<p>${p.description}</p>` : ""}
            ${
              p.technologies
                ? `<div>${p.technologies.map((t) => `<span class="tech">${t}</span>`).join("")}</div>`
                : ""
            }
          </div>
        `
          )
          .join("")}
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleExport}>
      📄 Export PDF
    </Button>
  );
}
