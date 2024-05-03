import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

interface Props {
  href: string;
  icon: React.ReactNode;
  title: string;
  classCustom?: string;
  isLink?: boolean;
  onClick?: () => void;
}

export const SidebarMenuItem = ({ href, title, icon, classCustom = '', isLink = false, onClick}: Props) => {

  if (!isLink) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center w-full mt-4 py-2 px-3 hover:bg-gray-100 dark:hover:bg-dhoverLink rounded transition-all gap-3 ${classCustom} tracking-wide uppercase`}
      >
        {icon}
        <span className='font-medium text-sm'>{title}</span>
      </button>
    )
  }

  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex items-center mt-4 py-2 px-3 hover:bg-gray-100 dark:hover:bg-dhoverLink rounded transition-all gap-3 ${classCustom} tracking-wide uppercase`}
    >
      {icon}
      <span className='font-medium text-sm'>{title}</span>
      <div className="flex-1" />
      <IoChevronForward size={21} className="text-textSecondary dark:text-dtextSecondary" />
    </Link>
  )
}
