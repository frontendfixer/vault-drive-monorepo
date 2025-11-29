import React from 'react';
import * as TanstackQuery from '../tanstack-query/root-provider';
import StoreProvider from './store-provider.tsx';
import { ThemeProvider } from './themes/theme-provider';

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQuery.Provider {...TanstackQuery.getContext()}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </TanstackQuery.Provider>
  );
}
