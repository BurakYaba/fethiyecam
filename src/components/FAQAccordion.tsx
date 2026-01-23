"use client";

import { useState } from "react";
import { RiArrowDownSLine, RiQuestionLine } from "@remixicon/react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Henüz soru eklenmemiş.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-8 h-8 rounded-lg bg-[#3D8C40]/10 flex items-center justify-center shrink-0 mt-0.5">
                <RiQuestionLine className="w-5 h-5 text-[#3D8C40]" />
              </div>
              <h3
                className="text-lg md:text-xl font-semibold text-gray-900 flex-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {faq.question}
              </h3>
            </div>
            <RiArrowDownSLine
              className={`w-6 h-6 text-gray-400 shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-5 pl-[72px]">
              <div
                className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
