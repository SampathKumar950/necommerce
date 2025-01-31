import { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

const Header = () => {

    // const location = useLocation();
    // const isHomePage = location.pathname === '/';
  
    const [header, setHeader] = useState(false);
  
    useEffect(() => {
      window.addEventListener('scroll', () =>
        window.scrollY > 50
          ? setHeader(true)
          : setHeader(false)
      );
    });
  
  
    return (
      <header
        className={`fixed z-50 w-full transition-all duration-300 
        ${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'}`}
      >
  
        <div className='container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0'>
  
          {/* Logo */}
          <Link to="/">
            {
              header
                ? <img src='../../public/favicon.jpg' className='w-[60px] rounded-full' /> //<img className='w-[160px]' src={LogoDark} />
                : <img src='../../public/favicon.jpg'className='rounded-full w-[50px]' /> //<img className='w-[160px]' src={LogoWhite} />
            }
          </Link>
  
  
          {/* Nav */}
          {/* <nav className={`${header ? 'text-primary' : 'text-white'}
          flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}> */}
           <nav className=' text-accent font-bold  flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase'> 
               
               {/* {!isHomePage && <Searchbar />} */}
  
                <Link to="/" className='transition hover:text-emerald-900'>
                  Home
                </Link>
                <Link to="/" className='transition hover:text-emerald-900'>
                    Signup/sigin
                </Link>
                
              
            
          </nav>
  
        </div>
  
      </header>
    );
  };
  
  export default Header;