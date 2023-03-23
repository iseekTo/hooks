import type { RefObject } from "react";

import { useState, useEffect } from "react";

/**
 *
 * @param { ref } reference
 * @param { IntersectionObserverInit } intersectionOptions
 * @returns { boolean } Return true if the element is displayed in the current window
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  reference: RefObject<T>,
  intersectionOptions?: IntersectionObserverInit
): boolean => {
  const [isVisible, setIsVisible] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    ;(async () => {
      // intersection-observer polyfill
      // need? 
      if (typeof window.IntersectionObserver === 'undefined') {
        await import('intersection-observer')
      }

      const options: IntersectionObserverInit = {
        // detect 30% percent in page area
        threshold: 0.3,
        ...intersectionOptions,
      }

      observer.current = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entries[0].target)
          observer.disconnect()
        }
      }, options)

      if (reference.current) {
        observer.current.observe(reference.current)
      }
    })()

    // If unmounting, then disconnect
    return () => observer.current?.disconnect()
  }, [reference])

  return isVisible
}
