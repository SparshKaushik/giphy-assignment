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
