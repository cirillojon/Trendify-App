import {NavLink} from 'react-router-dom'
import logo from '../../images/logo-sm.png';

export default function Navigation() {
  const activeLink = "flex justify-center items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 w-1/5 lg:w-full lg:border-l-4 no-underline duration-200 border-[#a247db] bg-[#202328] text-slate-50 hover:text-slate-50";
  const normalLink = "flex justify-center items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 text-slate-400 hover:bg-[#202328] hover:text-slate-50 w-1/5 lg:w-full lg:border-l-4 border-transparent hover:border-[#a247db] no-underline duration-200";

  return (
    <div class="z-50 fixed bottom-0 shadow lg:left-0 w-full lg:w-24 bg-[#070a10] shadow-inner lg:h-screen lg:pt-16">
      <div class='lg:mt-16 lg:space-y-0 flex lg:flex-col h-auto'>
      <img select draggable="false" class="lg:w-20 lg:h-20 w-16 h-16 object-cover p-2 ml-auto mr-auto lg:mb-14  hidden lg:block" src={logo} alt="Trendify"></img>  
      <NavLink className={({ isActive }) => (isActive ? activeLink : normalLink)} exact to='/landing'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:w-10 lg:h-10 w-6 h-6 mr-auto ml-auto">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
            <span class='hidden sm:block'>Profile</span>
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeLink : normalLink)}  exact to='/topartist'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:w-10 lg:h-10 w-6 h-6 mr-auto ml-auto">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span class='hidden sm:block'>Artists</span>
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeLink : normalLink)}  exact to='/toptracks'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:w-10 lg:h-10 w-6 h-6 mr-auto ml-auto">
              <path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clip-rule="evenodd" />
            </svg>
            <span class='hidden sm:block'>Tracks</span>
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeLink : normalLink)}  exact to='/player'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:w-10 lg:h-10 w-6 h-6 mr-auto ml-auto">
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
            <span class='hidden sm:block'>Player</span>
          </div>
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? activeLink : normalLink)}  exact to='/playlist'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:w-10 lg:h-10 w-6 h-6 mr-auto ml-auto">
              <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
            </svg>
            <span class='hidden sm:block'>Library</span>
          </div>
        </NavLink>
      </div>
    </div>
  )
};