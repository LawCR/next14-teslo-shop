'use client'
import { useUIStore } from "../../store/ui-store"

export const TopMenuButtonMenu = () => {
  const onOpenSidebar = useUIStore(state => state.openSidebar)

  return (
    <button 
      onClick={onOpenSidebar}
      className='px-3 py-1 rounded-md transition-all text-textSecondary dark:text-dtextSecondary hover:text-text dark:hover:text-dtext hover:bg-gray-100 dark:hover:bg-dhoverLink tracking-wide'
    >
      MENU
    </button>
  )
}
