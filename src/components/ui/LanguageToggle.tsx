import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('zh-CN');

  useEffect(() => {
    const saved = localStorage.getItem('lang') ?? 'zh-CN';
    setLang(saved);
    document.documentElement.lang = saved;
  }, []);

  const toggle = () => {
    const next = lang === 'zh-CN' ? 'en' : 'zh-CN';
    setLang(next);
    document.documentElement.lang = next;
    localStorage.setItem('lang', next);
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-white/70 backdrop-blur text-muted hover:text-accent transition-colors"
      aria-label="Toggle language"
    >
      {lang === 'zh-CN' ? 'EN' : '中文'}
    </button>
  );
}
