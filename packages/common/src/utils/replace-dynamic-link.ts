type DynamicData = {
    // Add dynamic url parameters here
    [key: string]: string
}

type Options = {
    preserveQueryState?: true
}

export function replaceDynamicLink(
    route: string,
    data: Partial<DynamicData>,
    options?: Options
): string {

    const keys = Object.keys(data)
    let newRoute = route
    for (const key of keys) {

        if (route.indexOf(`[${key}]`) === -1) {
            throw new Error(`Invalid route: ${route}. Route must contain the placeholder [${key}].`)
        }

        newRoute = newRoute.replace(`[${key}]`, data[key as keyof typeof data] ?? '')
    }

    const url = new URL(newRoute)

    if (options?.preserveQueryState === true) {
        if (typeof window === 'undefined') {
            throw new Error(`replaceDynamicLink: Window is undefined, cannot preserve query state for route: ${newRoute}`)
        }

        const currentQuery = new URLSearchParams(window.location.search)
        currentQuery.forEach((value, key) => {
            url.searchParams.set(key, value as string)
        })
    }

    return url.toString()
}