import Link from "next/link";

interface Props {
    path: string;
    text: string;
    icon: React.ReactNode;
}

export const SidebarLink = ({ text, path, icon }: Props) => {
  return (
    <div className="flex items-center bg-blue-500 rounded-md p-2 border text-white hover:bg-blue-950 mb-2">
        <span className="mr-2">
            {icon}
        </span>

        <Link href={path} className="flex items-center">
            {text}
        </Link>
    </div>
  )
}
