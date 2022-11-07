import {useState} from 'react';
import { formatDuration } from './player/spotify.trackUtils';

export default function Playlist({playlist, recents}) {
  const [isShown, setIsShown] = useState(true);

  if (!playlist || !recents ) return;
  const active = "lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-purple-500 text-slate-50";
  const notActive = "text-slate-400 lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-transparent hover:border-purple-500 hover:text-slate-50 focus:border-purple-500 focus:text-slate-50";

  const showRecents = (event, showTheRecents) => {
    setIsShown(showTheRecents);
  };

  const playlists = playlist.items.map((card) => {
    return (
      <a href = {card.external_urls.spotify} target="_blank" rel="noopener noreferrer"
          class="bg-[#292f3d] shadow-2xl hover:shadow-[#713299]/50 hover:bg-[#3e4450] rounded 
            p-2 mr-auto ml-auto w-fit duration-500 no-underline">
          <div class="group relative">
              <img class="w-full lg:w-64 md:w-64 w-32 block rounded mr-auto ml-auto" src={card.images[0].url} alt="" draggable="false"/>
          </div>
          <div class="p-2">
              <h3 class="text-white lg:text-xl md:text-lg text-xs lg:mb-1 overflow-hidden truncate lg:w-60 md:w-44 w-24">{card.name}</h3>
              <p class="text-gray-400 -mb-1 lg:text-lg md:text-md text-xs">{card.tracks.total} Tracks</p>
          </div>
      </a>
    )
  })

  const recent = recents.slice(0, 50).map((song) => {
    return (
      <a href = {`/track/${song.track.id}/${song.track.name.replace('/', '')}/${song.track.album.name.replace('/', '')}`} target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 hover:bg-[#3e4450] no-underline duration-200 lg:w-3/6 w-11/12 mr-auto ml-auto">
          <span class="rounded-full lg:ml-3 ml-2">
              <a href = {song.track.external_urls.spotify} 
                  target="_blank" rel="noopener noreferrer"
                  class="filter hover:grayscale hover:contrast-100">
              <img alt = "profile-profile" draggable="false" src={song.track.album.images[0].url} 
                  class="object-content lg:w-16 lg:h-16 md:w-14 md:h-14 sw-12 h-12 rounded-full "/>
              </a>
          </span>
          <div class = "mt-2 lg:w-11/12 md:w-11/12 w-9/12 ">
              <div class = "inline-flex lg:w-11/12 w-9/12 -mb-14">
                <p class = "lg:text-xl text-soverflow-hidden truncate lg:w-9/12 w-40 text-slate-50 hover:text-sky-300"> 
                      <a target="_blank" rel="noopener noreferrer" 
                          class="no-underline hover:underline text-slate-50 hover:text-sky-300 
                               font-medium" href = {`/track/${song.track.id}/${song.track.name.replace('/', '')}/${song.track.album.name.replace('/', '')}`}>
                              {song.track.name}</a>
                </p>
              </div>
              <div class = "inline-flex w-full">
                <p class="lg:text-sm text-xs -mt-4 text-slate-300 overflow-hidden truncate w-48">{song.track.album.name}</p>
                <p class="lg:text-sm text-xs -mt-4 text-slate-300 overflow-hidden truncate w-full text-right pr-3">{formatDuration(song.track.duration_ms)}</p>
              </div>
              
              <p class="lg:text-xs text-xs -mt-4 text-slate-400 overflow-hidden truncate w-48">{song.track.artists[0].name}</p>
          </div>
      </a>
    )
  })

  return (
    <div class = "ml-auto mr-auto lg:px-10 pb-20 md:pb-32 lg:pt-5 pt-3">
        <div className="sm:pl-5 ml-auto mr-auto text-gray-500 lg:space-x-4 space-x-3 mb-6 lg:w-3/6 w-11/12 ">
          <button class={isShown ? active : notActive}
            onClick={(event) => showRecents(event, true)}>
            Recents
          </button>
          <button class={isShown ? notActive : active}
            onClick={(event) => showRecents(event, false)}>
            Playlists
          </button>
        </div>
        {isShown ?
          <div class="w-full">
          {recent}
          </div>
          :
          <div class = "mr-auto ml-auto lg:w-4/6 md:w-10/12 w-fit lg:gap-5 md:gap-4 gap-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-evenly">
          {playlists}
          </div>
        }
    </div>
  )
}


