import { useLayoutEffect } from "react";

/**
 * Disable page scrolling
 * @ScenseA When opened a modal
 */
export const useLockBody = () => {
  useLayoutEffect(() => {
    document.body.style.setProperty("overflow", "hidden");

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);
};
