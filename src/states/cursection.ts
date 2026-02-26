import { atom } from "jotai";

export type Section = "hero" | "services" | "audience" | "premium" | "gallery" | "cta" | "footer";
export const currentSectionAtom = atom<Section>("hero");