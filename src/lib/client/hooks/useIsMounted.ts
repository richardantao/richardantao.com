"use client";
import { useEffect, useState } from "react";

/**
 * Hook to determine if the component is mounted (client-side)
 * @returns {boolean} - True if mounted, false otherwise
 */
export const useIsMounted = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		return () => {
			setIsMounted(false);
		};
	}, []);

	return isMounted;
};
