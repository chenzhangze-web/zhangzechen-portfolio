import { useState, useEffect, useCallback } from 'react';
import type { NavItem } from '@/types';
import { User, Briefcase, FileText, Award, Mail, Play } from 'lucide-react';

interface Props {
  items: NavItem[];
}

const iconMap: Record<string, typeof User> = {
  user: User,
  briefcase: Briefcase,
  'file-text': FileText,
  award: Award,
  play: Play,
  mail: Mail,
};

export default function CapsuleNav({ items }: Props) {
  const [activeSection, setActiveSection] = useState(items[0]?.sectionId ?? '');

  const handleClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.sectionId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-8 pointer-events-auto"
      aria-label="Main navigation"
    >
      <div className="flex items-end gap-4 w-fit px-4 py-3 glass rounded-[1rem] shadow-[0_10px_40px_rgba(0,0,0,.15)]">
        {items.map((item) => {
          const isActive = activeSection === item.sectionId;
          const Icon = iconMap[item.icon] || FileText;
          return (
            <button
              key={item.sectionId}
              onClick={() => handleClick(item.sectionId)}
              title={`${item.labelZh} / ${item.labelEn}`}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 cursor-pointer"
              style={{ color: isActive ? '#426bc2' : '#666' }}
            >
              <Icon size={22} strokeWidth={1.5} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
