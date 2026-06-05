'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-muted hover:text-accent transition-colors cursor-pointer p-1.5 -m-1.5"
    >
      {theme === 'dark'
        ? <Sun size={16} aria-hidden="true" />
        : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}
