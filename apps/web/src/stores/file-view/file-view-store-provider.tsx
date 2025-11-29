// src/providers/counter-store-provider.tsx
'use client';

import { createContext, type ReactNode, useContext,useRef } from 'react';
import { useStore } from 'zustand';

import {
  createFileViewStore,
  type FileViewStore,
  initFileViewStore,
} from '@/stores/file-view/file-view-store';

export type FileViewStoreApi = ReturnType<typeof createFileViewStore>;

export const FileViewStoreContext = createContext<FileViewStoreApi | undefined>(
  undefined,
);

export interface FileViewStoreProviderProps {
  children: ReactNode;
}

export const FileViewStoreProvider = ({
  children,
}: FileViewStoreProviderProps) => {
  const storeRef = useRef<FileViewStoreApi | null>(null);
  storeRef.current ??= createFileViewStore(initFileViewStore());

  return (
    <FileViewStoreContext.Provider value={storeRef.current}>
      {children}
    </FileViewStoreContext.Provider>
  );
};

export const useFileViewStore = <T,>(
  selector: (store: FileViewStore) => T,
): T => {
  const fileViewStoreContext = useContext(FileViewStoreContext);

  if (!fileViewStoreContext) {
    throw new Error(
      `useFileViewStore must be used within FileViewStoreProvider`,
    );
  }

  return useStore(fileViewStoreContext, selector);
};
