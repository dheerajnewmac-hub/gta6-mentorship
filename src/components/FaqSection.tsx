import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-slate-200/80 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#1D4ED8]">
            Quick Answers
          </p>
          <h2
            id="faq-heading"
            className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-7 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#FAFAFB]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4.5 text-left text-sm sm:text-base font-semibold text-slate-900 transition-colors hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1D4ED8]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    className="px-5 sm:px-6 pb-4.5 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
