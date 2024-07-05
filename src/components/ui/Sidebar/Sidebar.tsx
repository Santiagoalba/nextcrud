import Link from "next/link";
import { IoNewspaperOutline, IoDesktopOutline } from 'react-icons/io5';
import { SidebarLink } from "./SidebarLink";


const sidebarLinks = [
  { path: '/tasks', text: 'Dashboard', icon: <IoDesktopOutline size={20}/> },
  { path: '/tasks/new', text: 'Create Task', icon: <IoNewspaperOutline size={20}/> },
]

export const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col w-52 p-4">
        {
          sidebarLinks.map(link => (
            <SidebarLink key={link.text} {...link}/>
          ))
        }
      </div>
    </div>
  )
}