import { useState, useEffect, useCallback } from 'react';
import type { PublicationEntry } from '@/types';

interface Props {
  publications: PublicationEntry[];
}

export default function PublicationLightbox({ publications }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const close = useCallback(() => setActiveSlug(null), []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { slug: string } | undefined;
      if (detail?.slug) setActiveSlug(detail.slug);
    };
    window.addEventListener('open-lightbox', handler);
    return () => window.removeEventListener('open-lightbox', handler);
  }, []);

  useEffect(() => {
    if (!activeSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSlug, close]);

  const pub = publications.find((p) => p.slug === activeSlug);

  if (!activeSlug || !pub) return null;

  const authorPositionLabel = {
    zh: pub.authorPosition === 'first' ? '第一作者' : pub.authorPosition === 'second' ? '第二作者' : '合作者',
    en: pub.authorPosition === 'first' ? 'First Author' : pub.authorPosition === 'second' ? 'Second Author' : 'Co-Author',
  };
  const isProfileAuthor = (author: string) => author === 'Zhangze Chen' || author === 'Z. Chen';
  const authorBadgeClass = pub.authorPosition === 'first'
    ? 'bg-[#1a237e]/10 text-heading border-[#1a237e]/15'
    : 'bg-[#7a6a55]/10 text-[#6f6254] border-[#7a6a55]/15';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2f2a22]/45 backdrop-blur-md"
      onClick={close}
    >
      <div
        className="relative overflow-hidden bg-white/95 rounded-[10px] border border-white/70 shadow-[0_28px_90px_rgba(27,25,21,.32)] max-w-2xl w-full p-7 max-h-[82vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1a237e] via-[#426bc2] to-[#9b7b50]" />

        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={close}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-[0_8px_24px_rgba(0,0,0,.12)] text-muted hover:bg-heading hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Author position badge */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${authorBadgeClass}`}>
            <span className="lang-zh">{authorPositionLabel.zh}</span>
            <span className="lang-en">{authorPositionLabel.en}</span>
          </span>
          <span className="text-[10px] font-semibold text-muted/60">{pub.year}</span>
        </div>

        <h3 className="text-2xl font-display font-[800] text-heading mt-4 leading-tight">
          <span className="lang-zh">{pub.titleZh}</span>
          <span className="lang-en">{pub.titleEn}</span>
        </h3>

        {/* Authors */}
        <p className="text-sm text-muted mt-3 leading-relaxed">
          {pub.authors.map((author) =>
            isProfileAuthor(author)
              ? <span className="font-[700] text-black">{author}</span>
              : author
          ).reduce((prev: any, curr: any) => [prev, ', ', curr] as any)}
        </p>

        <p className="inline-flex w-fit rounded-full bg-accent/8 px-3 py-1.5 text-sm text-accent font-semibold mt-3">
          <span className="lang-zh">{pub.journalZh} ({pub.year})</span>
          <span className="lang-en">{pub.journalEn} ({pub.year})</span>
        </p>

        {(pub.descriptionZh || pub.descriptionEn) && (
          <p className="text-muted text-sm mt-5 leading-relaxed border-l-2 border-accent/25 pl-4">
            <span className="lang-zh">{pub.descriptionZh}</span>
            <span className="lang-en">{pub.descriptionEn}</span>
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {pub.tagsZh.map((tag) => (
            <span className="lang-zh px-2.5 py-1 text-[10px] font-semibold bg-[#f5f0e6] text-muted rounded-full border border-border/40">
              {tag}
            </span>
          ))}
          {pub.tagsEn.map((tag) => (
            <span className="lang-en px-2.5 py-1 text-[10px] font-semibold bg-[#f5f0e6] text-muted rounded-full border border-border/40">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {pub.links.length > 0 && (
          <div className="flex gap-3 mt-6 pt-5 border-t border-border">
            {pub.links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-heading px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(26,35,126,.18)] hover:bg-accent transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
