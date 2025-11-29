import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { CONSTANTS } from '@/lib/constants';

export type FileViewState = {
  view: 'list' | 'grid';
  gridIconSize: number;
};

export type FileViewActions = {
  setView: (view: 'list' | 'grid') => void;
  setGridIconSize: (size: number) => void;
};

export type FileViewStore = FileViewState & FileViewActions;

export const initFileViewStore = (): FileViewState => ({
  view: 'list',
  gridIconSize: CONSTANTS.GRID_ICON_SIZE,
});

const defaultState: FileViewState = {
  view: 'list',
  gridIconSize: CONSTANTS.GRID_ICON_SIZE,
};

export const createFileViewStore = (
  initialState: FileViewState = defaultState,
) =>
  createStore<FileViewStore>()(
    persist(
      set => ({
        ...initialState,
        setView: view => set({ view }),
        setGridIconSize: size =>
          set({
            gridIconSize: size,
          }),
      }),
      {
        name: 'file-view-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
