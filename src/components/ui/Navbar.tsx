import { ModeToggle } from '../theme-toggle';
import styles from './navbar.module.css';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <div className={`${styles.container} h-[80px] px-4 border-b-blue-800 border items-center`}>
        <div className='flex items-center'>
          <Image 
            src='/logo.png' 
            alt='logo' 
            width={45} 
            height={45} 
            className='mr-2'
          />
          <p className='text-blue-600 font-bold text-2xl'>San <span className='text-black dark:text-white'>Alba</span></p>
        </div>

        <div className='border-black dark:border-white border rounded-lg'>
          <ModeToggle/>
        </div>
    </div>
  )
}
