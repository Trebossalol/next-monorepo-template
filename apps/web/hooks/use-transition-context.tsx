'use client'

import * as React from 'react'

const TransitionContext = React.createContext<{
	isLoading: boolean
	startTransition: React.TransitionStartFunction
}>({ isLoading: false, startTransition: () => {} })

export const TransitionProvider = ({ children }: React.PropsWithChildren) => {
	const [isLoading, startTransition] = React.useTransition()
	return (
		<TransitionContext.Provider
			value={{
				isLoading,
				startTransition
			}}
		>
			{children}
		</TransitionContext.Provider>
	)
}

export function useTransitionContext() {
	const context = React.useContext(TransitionContext)
	if (context === undefined) {
		throw new Error(
			'useTransitionContext must be used within an TransitionContext'
		)
	}
	return context
}
