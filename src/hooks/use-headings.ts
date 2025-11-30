"use client";

import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useHeadings(containerSelector: string = "main") {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Extract headings from the container
    const elements = container.querySelectorAll("h2, h3");
    const headingData: Heading[] = [];

    elements.forEach((element) => {
      // Generate ID if it doesn't exist
      if (!element.id) {
        const id = element.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        if (id) element.id = id;
      }

      if (element.id && element.textContent) {
        headingData.push({
          id: element.id,
          text: element.textContent,
          level: parseInt(element.tagName.substring(1)),
        });
      }
    });

    setHeadings(headingData);

    // Set up Intersection Observer to track active heading
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [containerSelector]);

  return { headings, activeId };
}
