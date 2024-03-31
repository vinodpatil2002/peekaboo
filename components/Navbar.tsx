import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Logo"
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-bold text-white max-sm:hidden'>
          PeekaBoo
        </p>
      </Link>
      <div className="flex justify-between items-center gap-5 ">
        {/* clerk user management */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar