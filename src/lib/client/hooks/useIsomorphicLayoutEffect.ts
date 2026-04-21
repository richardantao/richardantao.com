"use client";
import { useEffect, useLayoutEffect } from "react";

/**
 * Use correct effects hooks based on the execution environment.
 * `useLayoutEffect` will be called on the client, `useEffect` will be called on the server
 * @function useIsomorphicLayoutEffect
 */
export const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;
