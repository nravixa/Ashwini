import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedIcon from "./animations/AnimatedIcon";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const renderedItems = useMemo(() => (
    items.map((item, index) => {
      const isOpen = openIndex === index;
      return (
        <div
          key={index}
          className="border-b border-outline-variant/30 pb-4 transition-colors duration-300"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center py-4 text-left card-subtitle !text-white hover:!text-rose-gold transition-colors focus:outline-none group"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {item.question}
            </span>
            <span
              className={`text-rose-gold shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            >
              <AnimatedIcon>
                <ChevronDown className="w-5 h-5" />
              </AnimatedIcon>
            </span>
          </button>

            {isOpen ? (
              <div
                key={`faq-content-${index}`}
                className="overflow-hidden"
              >
                <p className="card-body pb-4 pt-1">
                  {item.answer}
                </p>
              </div>
            ) : null}
        </div>
      );
    })
  ), [items, openIndex, toggleItem]);

  return (
    <div className="space-y-4 max-w-4xl mx-auto w-full">
      {renderedItems}
    </div>
  );
}

export default React.memo(FAQAccordion);
