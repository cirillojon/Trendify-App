import {useState} from 'react';
import spotifyLogo from "../../images/spotifyIcon.png"
import noImage from "../../images/unknownArtist.png"
import ErrorMessage from "./spotify.error"

export default function Artists({ topArtists, topArtistsSixMos, topArtistsThreeMos }) {
  const [isShown, setIsShown] = useState("allTime");
  if(topArtists.length < 1) {
    return (
        <ErrorMessage />
    )
} 
  if(!topArtists || !topArtistsSixMos || !topArtistsThreeMos) return;

  const active = "lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-purple-500 text-slate-50";
  const notActive = "text-slate-700 lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-transparent hover:border-purple-500 hover:text-slate-50 focus:border-purple-500 focus:text-slate-50";
  const divClass = "mr-auto ml-auto lg:w-4/6 md:w-9/12 w-10/12 lg:gap-5 md:gap-4 gap-3 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 justify-evenly";
  const showRecents = (event, showTheRecents) => {
    setIsShown(showTheRecents);
  };

  
  const renderArtists = (artist) => {
    return (
      <a href = {artist.external_urls.spotify} target="_blank" rel="noopener noreferrer"
      class="justify-self-center no-underline 
        hover:text-green-500 text-slate-50 hover:text-sky-300
        hover:scale-110 transition duration-300 ease-in-out">
          <div class="flex rounded-full justify-items-center">
              <a href = {artist.external_urls.spotify} 
               target="_blank" rel="noopener noreferrer"
               class=" ">
                  <img alt = "profile-profile" draggable="false" src={(artist.images.length === 0) ? `${noImage}` : `${artist.images[0].url}`} 
                  class="object-content pr-auto lg:w-36 md:w-32 w-20 rounded-full aspect-square "/>
              </a>
          </div>
          <div class = "lg:w-36 md:w-32 w-20 mt-2 mr-auto ml-auto max-w-full">
            <p class="text-center lg:text-lg md:text-sm text-xs font-medium">{artist.name}</p>
          </div>
      </a>
    )
  }
  const artists = topArtists.map((artist) => {
    return renderArtists(artist);
  });
  const artistsSixMos = topArtistsSixMos.map((artist) => {
    return renderArtists(artist);
  });
  const artistsThreeMos = topArtistsThreeMos.map((artist) => {
    return renderArtists(artist);
  });

  return (
    <div class = "pt-1">
      {artists ?
        <div class = "lg:px-10 pb-20 md:pb-32 lg:pt-5 pt-3">
        <div className="lg:w-4/6 md:w-9/12 w-10/12 sm:pl-5 ml-auto mr-auto text-gray-500 lg:space-x-4 space-x-2 mb-6">
          <strong class = "lg:text-4xl md:text-3xl text-sm font-bold tracking-wide text-slate-50">Top Artist</strong>
          <button class={isShown === 'allTime' ? active : notActive}
            onClick={(event) => {
              showRecents(event, 'allTime');
              }}>
            All Time
          </button>
          <button class={isShown === 'sixMos' ? active : notActive}
            onClick={(event) => {
              showRecents(event, 'sixMos');
              }}>
            Six Months
          </button>
          <button class={isShown === 'threeMos' ? active : notActive}
            onClick={(event) => {
              showRecents(event, 'threeMos');
              }}>
            Three Months
          </button>
        </div>
          {isShown === 'allTime' ?
            <div class={divClass}>
            {artists}
            </div>
             :
             <>
             {isShown === 'sixMos' ?
               <div class={divClass}>
               {artistsSixMos}
               </div>
               :
               <>
               {isShown === 'threeMos' ?
                 <div class={divClass}>
                 {artistsThreeMos}
                 </div>
                 :
                  <div class = "flex h-screen justify-center items-center">
                      <div class="
                        spinner-border
                        animate-spin
                        inline-block
                        w-8
                        h-8
                        border-4
                        rounded-full
                        text-purple-500
                        " role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                  </div>
                }
                </>
              }
              </>
            }
          <div class = "w-fit flex ml-auto mr-auto text-slate-400 justify-around items-center pt-10">
              <div class = "text-center lg:text-lg text-md pr-2">Data obtained from Spotify</div>
              <img class="lg:w-8 w-6 block" src={spotifyLogo} alt="" draggable="false"/>
          </div>
        </div>

        :
        <div class = "flex h-screen justify-center items-center">
              <div class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
                text-purple-500
                " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    </div>

    )
  }
