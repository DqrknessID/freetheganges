import React from 'react';
import { Globe, ExternalLink, Download } from 'lucide-react';
import { ResearchPublication } from '../../types';

interface PublicationCardProps {
  publication: ResearchPublication;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication: pub }) => {
  const handleDownload = () => {
    // Generates a mock document blob trigger for verified research reports
    const mockContent = `FREE THE GANGES RESEARCH REPOSITORY\n` +
      `Title: ${pub.title}\n` +
      `Category: ${pub.category}\n` +
      `Authors: ${pub.authors.join(', ')}\n` +
      `Affiliation: ${pub.affiliation}\n` +
      `Date: ${pub.publishedDate}\n` +
      `DOI/Ref: ${pub.doiOrReference}\n\n` +
      `EXECUTIVE SUMMARY:\n${pub.executiveSummary}\n\n` +
      `KEY EMPIRICAL FINDINGS:\n` +
      pub.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n') +
      `\n\nEVIDENCE & METHODOLOGY:\n${pub.evidenceMethodology}\n`;

    const blob = new Blob([mockContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pub.id}-dossier.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <article className="bg-surface border border-border-subtle rounded-xl p-6 space-y-4 hover:border-border-strong transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-medium text-text-secondary">
            {pub.category}
          </span>
          <span className="text-xs text-text-secondary">
            Published: {pub.publishedDate}
          </span>
        </div>
        <span className="text-xs text-text-secondary font-mono">
          Confidence: <span className="text-text-primary font-semibold">{pub.confidenceLevel}</span>
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-sans font-bold text-white leading-snug">
        {pub.title}
      </h2>

      <div className="text-xs text-text-secondary">
        Authors: <span className="text-text-primary">{pub.authors.join(', ')}</span> | {pub.affiliation}
      </div>

      <div className="text-xs text-text-secondary flex items-center gap-1.5 font-mono">
        <Globe className="w-3.5 h-3.5 text-text-secondary" />
        <span>Geographic Scope: {pub.geographicScope}</span>
      </div>

      <div className="p-3.5 rounded-lg bg-surface-elevated border border-border-subtle space-y-2">
        <h3 className="text-xs font-semibold text-text-secondary">
          Executive summary
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          {pub.executiveSummary}
        </p>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-text-secondary">
          Key empirical findings:
        </h4>
        <ul className="space-y-1 text-xs text-text-secondary list-disc list-inside">
          {pub.keyFindings.map((finding, idx) => (
            <li key={idx}>{finding}</li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {pub.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-text-secondary font-mono">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            aria-label={`Download research brief for ${pub.title}`}
            className="min-h-[44px] px-3.5 py-1.5 rounded bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-text-primary text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-text-secondary" />
            <span>Download Brief</span>
          </button>

          <a
            href={pub.doiOrReference}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-3 flex items-center gap-1.5 text-text-primary hover:underline text-xs font-medium"
          >
            <span>Inspect Publication Reference</span>
            <ExternalLink className="w-3.5 h-3.5 text-text-secondary" />
          </a>
        </div>
      </div>
    </article>
  );
};
