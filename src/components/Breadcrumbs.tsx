"use client";

import Link from "next/link";
import { RiArrowRightSLine } from "@remixicon/react";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-gray-50 py-3 border-b border-gray-200"
    >
      <div className="container mx-auto px-6">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {!isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="text-[#3D8C40] hover:underline"
                    >
                      {item.label}
                    </Link>
                    <RiArrowRightSLine className="w-4 h-4 text-gray-400" />
                  </>
                ) : (
                  <span className="text-gray-600 font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
