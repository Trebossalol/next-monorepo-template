"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import NiceModal from "@ebay/nice-modal-react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NiceModal.Provider>
      <NuqsAdapter>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Toaster />
          {children}
        </NextThemesProvider>
      </NuqsAdapter>
    </NiceModal.Provider>
  )
}
