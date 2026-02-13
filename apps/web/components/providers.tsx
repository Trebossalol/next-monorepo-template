'use client'

import NiceModal from '@ebay/nice-modal-react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type * as React from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NiceModal.Provider>
			<NextTopLoader color="var(--color-primary)" />
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
