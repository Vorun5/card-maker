import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const ALL_THEMES = ['dark', 'light']

type useThemeReturn = [Theme, () => void]

export const useTheme = (): useThemeReturn => {
    const localTheme = localStorage.getItem('theme') ?? 'dark'
    const [theme, setTheme] = useState<Theme>(
        ALL_THEMES.includes(localTheme) ? (localTheme as Theme) : 'dark',
    )

    const switchTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.classList.value = theme
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    return [theme, switchTheme]
}
