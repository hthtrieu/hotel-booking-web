import Link from 'next/link'
import React from 'react'
import { cn } from '@/libs/utils'
import MaxWidthWrapper from '../MaxWidthWrapper'
const links = [
    { title: 'Home', path: '/home' },
    { title: 'Libraries', path: '/libraries' },

]
const Header = () => {
    return (
        <header className='sticky top-0 bg-white dark:bg-blue-900 w-full z-20 start-0 border-b border-blue-200 dark:border-blue-600'>
            <MaxWidthWrapper>
                <nav className="bg-white dark:bg-blue-900 w-full dark:border-blue-600">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        {/* <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Flowbite
                    </span>
                </a> */}
                        <div className='text-white'>
                            <Link
                                href={'/'}
                            // aria-current="page"
                            >
                                Logo
                            </Link>
                        </div>
                        <div className="hidden w-full md:block md:w-auto">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-blue-800 md:dark:bg-blue-900 dark:border-blue-700">
                                {
                                    links.map((link, index: number) => {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={link.path}
                                                    className={cn("py-2 px-3 text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-white md:dark:hover:text-yellow-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent",

                                                    )}
                                                >
                                                    {link.title}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav >
            </MaxWidthWrapper>
        </header>

    )
}

export default Header
