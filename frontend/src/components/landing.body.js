import ScreenMockUp from '../images/ScreenMockUps.png';
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "user-top-read",
  "user-follow-read",
  "user-follow-modify",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "streaming",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
//test
function connectSpotify() {
  if (process.env.NODE_ENV === 'production') 
    return "https://accounts.spotify.com/authorize?client_id=abb24fee7b8443d3bab993fe8504fbab&response_type=code&redirect_uri=https://trendify-project.herokuapp.com/&scope=" + SCOPES_URL_PARAM + "&response_type=code&show_dialog=true";  
  
  else {
    console.log(SCOPES_URL_PARAM);
    return "https://accounts.spotify.com/authorize?client_id=abb24fee7b8443d3bab993fe8504fbab&response_type=code&redirect_uri=http://localhost:3000/&scope=" + SCOPES_URL_PARAM + "&response_type=code&show_dialog=true";    
  }
    
}

function Body() {
  
  return (
    <div class="lg:px-72 px-10 mx-auto flex mt-16 mb-10 md:flex-row flex-col items-center">
      <div class="md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl 
      mb-4 font-medium text-white text-center">
        Find out your most listened artist and more...
      </h1>
      <p class="mb-8 leading-relaxed text-white text-left">
        This app is dedicated to all the music nerds. 
        Trendify offers you the ability to view your top artist, top tracks, 
        as well as view the stats and insights of a particular song.
        Do you have a music you want to play? You can try playing it with our TrendiPlayer.
      </p>
      <div class="lg:w-2/5 w-4/5 flex justify-center mt-3 ml-auto mr-auto">
        <a class = "w-full" href={connectSpotify()}>
          <button class="tracking-wider w-full h-16 px-6 lg:text-md text-sm
          transition-colors duration-150 bg-[#2ebd59] focus:shadow-outline 
          text-slate-50 font-bold py-2 px-2 rounded-full hover:bg-[#259747] 
          hover:text-slate-200 duration-300">
            Login with Spotify
          </button>
        </a>
      </div>
      </div>
      <div class="lg:pt-0 md:pt-0 pt-10">
        <img draggable="false" class="shadow-2xl object-cover object-center rounded-xl bg-[#362043]" alt="hero" src={ScreenMockUp}></img>
      </div>
    </div>
  );
};
  
export default Body;
