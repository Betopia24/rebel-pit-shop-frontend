"use client"
import { useMediaQuery } from "./use-media-query";
import { MOBILE_BREAKPOINT } from "@/lib/constants";

export function useMobile() {
    return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT-1}px)`)
}