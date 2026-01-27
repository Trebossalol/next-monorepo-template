export function capitalize(str: string): string {
    if (!str) return str
    if (str.length === 1) return str.charAt(0).toUpperCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getInitials(name: string): string {
    if (!name) return ""
    return name
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .slice(0, 2)
        .map((v) => v?.[0]?.toUpperCase())
        .join("")
}