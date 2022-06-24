import type { Dispatch, SetStateAction } from "react";

import { useState, useCallback } from "react";

import { usePageIsUnmounted } from "./usePageIsUnmounted";

/**
 * 更安全的 `useState`, 用法与 `useState` 一致。
 * The safer `userstate`, the usage is consistent with the` userstate`.
 * @override
 * @use
 * - 此hook会解决：在页面卸载时，触发了setState导致内存泄漏的问题
 * - This hook solves the problem of memory leaks caused by Setstate when a page is unloaded
 */
export function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
export function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];
export function useSafeState(initialState?: unknown) {
  const unmountedRef = usePageIsUnmounted();
  const [state, setState] = useState(initialState);

  const setCurrentState = useCallback(
    (currentState) => {
      // 如果组件已经卸载则不再更新 state
      // State is no longer updated if the component has been unmounted
      if (unmountedRef) return;

      setState(currentState);
    },
    [unmountedRef]
  );

  // `as const` 将表达式转换为元组类型
  // transform truple type
  // @see https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case
  return [state, setCurrentState] as const;
}
