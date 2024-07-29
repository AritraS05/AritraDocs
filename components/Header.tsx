import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
const Header = ({children ,className} : HeaderProps) => {
  return (
    <div className={ cn('header',className)}>
        <Link href="/" className = "md:flex-1">
            <Image src="/assets/images/logo.svg" width={70} height={32} alt="logo" 
            className='hidden md:block'
            />
        </Link>
        <Link href="/" className = "md:flex-1">
            <Image src="/assets/images/logo.svg" width={32} height={32} alt="logo" 
            className='mr-2 md:hidden'
            />
        </Link>
        {children}
    </div>
  )
}

export default Header