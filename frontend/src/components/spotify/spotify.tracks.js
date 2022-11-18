import {useState} from 'react';
import { formatDuration } from './player/spotify.trackUtils';
import spotifyLogo from "../../images/spotifyIcon.png"

export default function Tracks({ topTracks, topTracksSixMos, topTracksThreeMos }) {
  const [isShown, setIsShown] = useState("allTime");
  if(!topTracks || !topTracksSixMos || !topTracksThreeMos) return;

  const active = "lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-purple-500 text-slate-50";
  const notActive = "text-slate-700 lg:text-2xl md:text-xl text-xs font-bold tracking-wide transition duration-300 border-b-4 border-transparent hover:border-purple-500 hover:text-slate-50 focus:border-purple-500 focus:text-slate-50";
  const divClass = "w-full";
  const highlightButton = (event, showTheRecents) => {
    setIsShown(showTheRecents);
  };
  
  const renderTracks = (tracks) => {
    return (
      <a href = {`/track/${tracks.id}/${tracks.name.replace('/', '')}/${tracks.album.name.replace('/', '')}/${tracks.artists[0].name.replace('/', '')}`} target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 
        hover:bg-[#3e4450] no-underline duration-200 lg:w-3/6 w-11/12 mr-auto ml-auto
        hover:scale-105 transition duration-300 ease-in-out text-slate-50 hover:text-sky-300">
          <span class="rounded-full lg:ml-3 ml-2">
              <a href = {tracks.external_urls.spotify} 
                  target="_blank" rel="noopener noreferrer"
                  class="filter hover:grayscale hover:contrast-100">
              <img alt = "profile-profile" draggable="false" src={tracks.album.images[2].url} 
                  class="object-content lg:w-16 lg:h-16 md:w-14 md:h-14 sw-12 h-12 ml-1"/>
              </a>
          </span>
          <div class = "mt-2 lg:w-11/12 md:w-11/12 w-9/12 ">
              <div class = "inline-flex lg:w-11/12 w-9/12 -mb-14">
                <p class = "lg:text-xl text-soverflow-hidden truncate w-fit"> 
                {tracks.name}
                </p>
              </div>
              <div class = "inline-flex w-full">
                <p class="lg:text-sm text-xs -mt-4 text-slate-300 overflow-hidden truncate w-full">{tracks.album.name}</p>
                <p class="lg:text-sm text-xs -mt-4 text-slate-300 overflow-hidden truncate w-full text-right pr-3">{formatDuration(tracks.duration_ms)}</p>
              </div>
              
              <p class="lg:text-xs text-xs -mt-4 text-slate-400 overflow-hidden truncate w-48">{tracks.artists[0].name}</p>
          </div>
      </a>
    )
  }
  const tracks = topTracks.map((tracks) => {
    return renderTracks(tracks);
  });
  const tracksSixMos = topTracksSixMos.map((tracks) => {
    return renderTracks(tracks);
  });
  const tracksThreeMos = topTracksThreeMos.map((tracks) => {
    return renderTracks(tracks);
  });


  return (
    <div class = "pt-1">
      {tracks ?
        <div class = "lg:px-10 pb-20 md:pb-32 lg:pt-5 pt-3">
          <div className="lg:w-3/6 w-11/12 ml-auto mr-auto text-gray-500 lg:space-x-4 space-x-2 mb-6">
            <strong class = "lg:text-4xl md:text-3xl text-sm font-bold tracking-wide text-slate-50">Top Tracks</strong>
            <button class={isShown === 'allTime' ? active : notActive}
              onClick={(event) => {
                highlightButton(event, 'allTime');
                }}>
              All Time
            </button>
            <button class={isShown === 'sixMos' ? active : notActive}
              onClick={(event) => {
                highlightButton(event, 'sixMos');
                }}>
              Six Months
            </button>
            <button class={isShown === 'threeMos' ? active : notActive}
              onClick={(event) => {
                highlightButton(event, 'threeMos');
                }}>
              Three Months
            </button>
          </div>
          {isShown === 'allTime' ?
            <div class={divClass}>
            {tracks}
            </div>
              :
              <>
              {isShown === 'sixMos' ?
                <div class={divClass}>
                {tracksSixMos}
                </div>
                :
                <>
                {isShown === 'threeMos' ?
                  <div class={divClass}>
                  {tracksThreeMos}
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
          <div class = "flex ml-auto mr-auto text-slate-400 justify-around items-center pt-10 w-fit">
              <div class = "text-center lg:text-lg text-md pr-2">Data obtained from Spotify</div>
              <img class="w-full lg:w-8 w-6 block" src={spotifyLogo} alt="" draggable="false"/>
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


