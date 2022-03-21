import type { RefObject } from "react";

import { useState, useEffect } from "react";

/**
 *
 * @param { ref } reference
 * @returns { boolean } Return true if the element is displayed in the current window
 * @scenseA Long and multi module
 * @scenseB Lazy load module
 * @scenseC Todo...
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  reference: RefObject<T>
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entries[0].target);
        observer.disconnect();
      }
    });

    if (reference.current) {
      observer.observe(reference.current);
    }

    // If unmounting, then disconnect
    return () => observer.disconnect();
  }, [reference]);

  return isVisible;
};
