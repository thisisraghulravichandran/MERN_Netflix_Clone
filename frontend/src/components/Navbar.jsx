import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Search, LogOut, Menu } from 'lucide-react'

const Navbar = () => {
  const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
  const { user, logout } = useAuthStore();

  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50 justify-between w-full'>
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
        </Link>

        {/* Desktop navbar items */}
        <div className='hidden sm:flex items-center gap-2'>
          <Link to="/" className='hover:underline' onClick={() => setContentType("movie")}>Movies</Link>
          <Link to="/" className='hover:underline'onClick={() => setContentType("tv")}>TV Shows</Link>
          <Link to="/history" className='hover:underline'>Search History</Link>
        </div>

        {/* Secondary Menus */}
        <div className='flex gap-5 items-center z-50'>
          <Link to={"/search"}>
            <Search className='size-6 cursor-pointer'/>
          </Link>

          <img src={user?.image} alt="Avatar" className='h-8 rounded cursor-pointer'/>

          <LogOut className='size-6 cursor-pointer' onClick={logout} />

          <div className='sm:hidden'>
            <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}/>
          </div>
        </div>
      </div>
        
      {/* Mobile Navbar */}
      {isMobileMenuOpen && (<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
        <Link to="/" className='hover:underline p-2 block' onClick={() => {
          setContentType("movie");
          toggleMobileMenu();
          }}>Movies</Link>
        <Link to="/" className='hover:underline p-2 block' onClick={() => {setContentType("tv"); toggleMobileMenu();}}>TV Shows</Link>
        <Link to="/history" className='hover:underline p-2 block' onClick={toggleMobileMenu}>Search History</Link>
      </div>)}

    </header>
  )
}

export default Navbar