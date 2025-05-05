import { FC } from 'hono/jsx';

interface NavbarProps {
  children: any;
}

const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <nav
        id="navbar"
        class="flex-no-wrap fixed flex w-full items-center justify-between max-sm:justify-center max-sm:space-y-2 bg-transparent backdrop-blur-lg backdrop-brightness-50 py-2 md:px-2 shadow-md shadow-black/5 lg:flex-wrap lg:justify-start lg:py-4 z-50 top-0">
      <div class="flex w-full flex-wrap items-center justify-between max-sm:justify-center max-sm:mt-2 max-sm:space-y-2 px-3">  
        {children}
      </div>
    </nav>
  )
}

export default Navbar;
