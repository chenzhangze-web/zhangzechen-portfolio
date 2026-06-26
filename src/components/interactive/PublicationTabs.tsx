import { useState, useEffect, type ReactNode } from 'react';

interface Props {
  categories: { key: string; label: string }[];
  children?: ReactNode;
}

export default function PublicationTabs({ categories, children }: Props) {
  const [active, setActive] = useState('all');

  useEffect(() => {
    const grid = document.getElementById('pub-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>('[data-category]');

    cards.forEach((card) => {
      if (active === 'all' || card.dataset.category === active) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  }, [active, children]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActive('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            active === 'all'
              ? 'bg-[#426bc2] text-white shadow-sm'
              : 'text-[#666] hover:text-[#1a237e] bg-white/50'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              active === cat.key
                ? 'bg-[#426bc2] text-white shadow-sm'
                : 'text-[#666] hover:text-[#1a237e] bg-white/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div id="pub-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
