import { create } from "zustand";

export enum HomePageGifState {
  Play = "playing",
  Pause = "paused",
}

type HomePageGifStateType = {
  state: HomePageGifState;
  toggleState: () => void;
};

export const useHomePageGifState = create<HomePageGifStateType>((set) => ({
  state: HomePageGifState.Play,
  toggleState: () =>
    set((s) => ({
      state:
        s.state === HomePageGifState.Play
          ? HomePageGifState.Pause
          : HomePageGifState.Play,
    })),
}));

type isAPILimitExhaustedType = {
  state: boolean;
  setIsAPILimitExhausted: (isExhausted: boolean) => void;
};

export const isAPILimitExhausted = create<isAPILimitExhaustedType>((set) => ({
  state: false,
  setIsAPILimitExhausted: (isExhausted: boolean) => set({ state: isExhausted }),
}));
