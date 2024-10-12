// "use client"
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState,useEffect } from 'react';
// import {signIn , signOut , useSession,getProviders} from 'next-auth/react'


// const Nav = () => {
//     const isUserLoggedIn = true;
//     const [providers , setProviders] = useState(null)
//     const [toggleDropdown , setToggleDropdown] = useState(false);


//     useEffect(() => {
//         const setProviders = async () => {
//             const response = await getProviders();

//             setProviders(response);
//         }
//         setProviders();
//     },[])
//   return (
//     <nav className='flex-between w-full mb-16 pt-3'>
//         <Link href="/" className='flex gap-2 flex-center'>
//             <img src="/assets/images/logo.svg"
//              width={32} 
//              height={32}
//              className='object-contain'/>
//              <p className='logo_text'>Promptopia</p>
//         </Link>

//         {/*mobile navigation*/}
//         <div className='sm:flex hidden'>
//            {isUserLoggedIn? (
//              <div className='flex gap-3 md:gap-5'>
//                     <Link href='/create-prompt' className='black_btn'>
//                         Create Post
//                     </Link>

//                     <button type='button' onClick={signOut} className='outline_btn'>
//                         Sign Out
//                     </button>

//                     <Link href="/profile"> 
//                         <img src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile' />
//                     </Link>
//              </div>
//            ): (
//              <>
//              {providers && 
//               Object.values(providers).map((provider) => (
//                 <button 
//                 type='button'
//                 key={provider.name}
//                 onClick={() => signIn(provider.id)}
//                 className='black_btn'
//                 >
//                   Sign In
//                 </button>
//               ))
//               }
//              </>
//            )}
//         </div>

//         { /* mobile navigation */}
//            <div className='sm:hidden flex relative'>
//                 { isUserLoggedIn ? (
//                   <div className='flex'>
//                       <img src='/assets/images/logo.svg' 
//                       width={37} height={37} 
//                       className='rounded-full' 
//                       alt='profile' 
//                        onClick={() => setToggleDropdown((prev) => !prev)}/>

//                        {toggleDropdown && 
//                         <div className='dropdown'>
//                           <Link 
//                           href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
//                             My Profile
//                           </Link>
//                           <Link 
//                           href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>
//                             Create Prompt
//                           </Link>

//                           <button type='button'
//                           onClick={() => 
//                           {setToggleDropdown(false);
//                           signOut();}
//                           }
//                           className="mt-5 w-full black_btn"></button>
//                         </div>
//                        }

//                   </div>
//                 ) : (
//                   <>
//              {providers && 
//               Object.values(providers).map((provider) => (
//                 <button 
//                 type='button'
//                 key={provider.name}
//                 onClick={() => signIn(provider.id)}
//                 className='black_btn'
//                 >
//                   Sign In
//                 </button>
//               ))
//               }
//              </>
//                 )

//                 }
//            </div>
//     </nav>
//   )
// }

// export default Nav

"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const {data:session} = useSession(); // This should be dynamically set based on the session status
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <img
          src="/assets/images/logo.svg"
          width={32}
          height={32}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
              <img
                src={session?.user.image} 
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <img
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
