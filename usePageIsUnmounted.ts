import { useRef, useEffect } from "react";

/**
 * 组件是否已经卸载
 * Whether the component has been unmount
 */
export const usePageIsUnmounted = () => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = false;

    return () => {
      ref.current = true;
    };
  }, []);

  return ref.current;
};
