import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

// react icons 
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    // toggleMenu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100){
                setIsSticky(true);
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const { user, logout } = useAuth() || {}

    // navItems here
    const navItems = [
        {label: "Home", path: "/"},
        {label: "About", path: "/about"},
        {label: "Shop", path: "/shop"},
        ...(user?.role === 'admin' ? [{label: "Sell Your Book", path: "/admin/dashboard"}] : []),
        {label: "Blog", path: "/blog"},
    ]
  return (
    <header className='w-full bg-transparent fixed top-0 right-0 left-0 transition-all ease-in duration-300'>
        <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300": ""}`}>
            <div className='flex justify-between items-center text-base gap-8'>
                { /* logo */}
                <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block'/>Books</Link>

                { /*  nav item for large device*/}
                <ul className='md:flex space-x-12 hidden'>
                   {navItems.map(({ label, path }) => (
                    <li key={path}>
                        <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                            {label}
                        </Link>
                    </li>
                    ))}
                </ul>

                {/* auth controls */}
                <div className='space-x-3 hidden lg:flex items-center'>
                    {user ? (
                        <>
                          <span className='text-sm'>Hi, {user.name}</span>
                          <button onClick={logout} className='px-3 py-2 rounded bg-blue-700 text-white'>Logout</button>
                        </>
                    ) : (
                        <>
                          <Link to='/login' className='px-3 py-2 rounded border'>Login</Link>
                          <Link to='/signup' className='px-3 py-2 rounded bg-blue-700 text-white'>Sign up</Link>
                        </>
                    )}
                </div>

                {/* menu btn for the mobile devices */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-black focus:outline-none'>
                        {
                            isMenuOpen? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black'/>
                        }
                    </button>
                </div>
            </div>

            {/* navItems for small devices */}
            <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden" } `}>
                <ul>
                    {navItems.map(({ label, path }) => (
                        <li key={path}>
                            <Link to={path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-700'>
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li className='mt-4'>
                      {user ? (
                        <button onClick={logout} className='px-3 py-2 rounded bg-white text-blue-700'>Logout</button>
                      ) : (
                        <div className='flex gap-2'>
                          <Link to='/login' className='px-3 py-2 rounded bg-white text-blue-700'>Login</Link>
                          <Link to='/signup' className='px-3 py-2 rounded bg-black text-white'>Sign up</Link>
                        </div>
                      )}
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default NavBar
