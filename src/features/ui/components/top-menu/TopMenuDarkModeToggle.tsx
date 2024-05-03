'use client'
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { useUIStore } from "../../store/ui-store"
import { useEffect } from "react";

export const TopMenuDarkModeToggle = () => {
  const theme = useUIStore(state => state.theme)
  const onSetThemeMode = useUIStore(state => state.setThemeMode)
  
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      onSetThemeMode("dark")
    } else if (localStorage.getItem("theme") === "light") {
      onSetThemeMode("light");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      onSetThemeMode("dark");
    }
  }, [onSetThemeMode]);

  function onToggleDarkMode() {
    if (theme === "dark") {
      onSetThemeMode("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (theme === "light") {
      onSetThemeMode("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } 
  }

  return (
    <button 
      id='dark-mode-toggle'
      aria-label='Toggle Dark Mode'
      role="button"
      title="Cambiar tema"
      onClick={onToggleDarkMode}
      className='btn-link'
    >
      {
        theme === 'dark'
        ? <IoMoonOutline className='w-5 h-5' />
        : <IoSunnyOutline className='w-5 h-5' />
      }
    </button>
  )
}
