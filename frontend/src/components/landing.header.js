import logo from '../images/logoWhite.png';
import tokenStorage from '../tokenStorage';

function Header() {
  const logout = event => {
    event.preventDefault();
    tokenStorage.removeToken();
    window.location.href = '/';
  };

  return (
    <header class="text-gray-700 body-font border-b-2 border-[#796a82] bg-[#1a0625]">
      <div class="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        <img select draggable="false" class="" style={{width: 200}} src={logo} alt="Trendify"></img>

        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        </nav>
        <button onClick={logout} class="tracking-wider w-auto h-10 text-white text-sm font-bold py-2 px-4 transition-colors duration-150 bg-[#1d4ed8]  focus:shadow-outline hover:bg-[#173ead] rounded-full">LOGOUT
        </button>
      </div>
    </header>
  );
};
  
export default Header;
