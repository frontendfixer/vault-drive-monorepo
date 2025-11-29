import React from 'react';
import { FileViewStoreProvider } from '@/stores/file-view/file-view-store-provider';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FileViewStoreProvider>{children}</FileViewStoreProvider>;
}
