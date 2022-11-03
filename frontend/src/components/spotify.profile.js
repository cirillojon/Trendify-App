import React from "react"

export default function Profile({ profile, numFollowing, playlist, topTracks, topArtists }) {
    if (!profile || !numFollowing || !playlist|| !topTracks || !topArtists ) return;

    const artists = topArtists.slice(0, 10).map((artist) => {
        return (
            <article class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 h-20">
                <span class="rounded-full ml-3">
                    <a href = {artist.external_urls.spotify} 
                            target="_blank" rel="noopener noreferrer"
                            class="filter hover:grayscale hover:contrast-100">
                        <img alt = "profile-profile" draggable="false" src={artist.images[2].url} 
                        class="object-content pr-auto lg:w-14 lg:h-14 w-12 h-12 rounded-full aspect-square "/>
                    </a>
                </span>
                <div class = "mt-2">
                    <a target="_blank" rel="noopener noreferrer" href = {artist.external_urls.spotify}
                        class = "no-underline hover:underline text-slate-50 hover:text-sky-300">
                        <p class="lg:text-xl text-sm font-medium">{artist.name}</p>
                    </a>

                </div>
            </article>
        )
    })

    const tracks = topTracks.slice(0, 10).map((track) => {
        return (
            <article class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3">
                <span class="rounded-full ml-3">
                    <a href = {track.external_urls.spotify} 
                        target="_blank" rel="noopener noreferrer"
                        class="filter hover:grayscale hover:contrast-100">
                    <img alt = "profile-profile" draggable="false" src={track.album.images[0].url} 
                        class="object-content lg:w-14 lg:h-14 w-12 h-12 rounded-full "/>
                    </a>
                </span>
                <div class = "mt-2">
                    <p>
                        <a target="_blank" rel="noopener noreferrer" 
                            class="no-underline hover:underline 
                            text-slate-50 hover:text-sky-300 lg:text-xl text-s font-medium" href = {track.external_urls.spotify}>
                                {track.name}</a>
                    </p>
                    <p class="lg:text-sm text-xs -mt-4 text-slate-300">{track.album.name}</p>
                    <p class="lg:text-xs text-xs -mt-4 text-slate-400">{track.artists[0].name}</p>
                </div>
            </article>
        )
    })

  return (
    <div class = "ml-auto mr-auto lg:px-10 px-2">
        <div class="ml-auto mr-auto min-h-fit lg:w-3/6 flex items-center justify-center">
            <div class="p-6 rounded-xl w-full">
                <img draggable="false" src={topTracks[0].album.images[0].url}
                    class="rounded-xl h-60 w-full object-cover shadow" alt=""/>
                <div class="flex justify-center relative">
                <img draggable="false" src={profile.images[0].url} 
                    class="w-32 h-32 object-cover rounded-full border-8 border-[#111827] shadow absolute -top-16" alt=""/>
                </div>
                <h1 class="text-slate-50 text-5xl mt-20 text-center font-bold mb-1 flex justify-center items-center space-x-2">
                    <a target="_blank" rel="noopener noreferrer" class="lg:text-5xl text-3xl font-bold no-underline hover:underline text-sky-50 hover:text-sky-300" href = {profile.external_urls.spotify} >{profile.display_name}</a>
                </h1>
                <div class="flex justify-center space-x-10 lg:space-x-32 md:space-x-20 xl:space-x-32 mb-10 mt-4">
                <div class="text-center">
                    <div class="lg:text-4xl text-2xl text-green-500 font-bold">
                    {numFollowing}
                    </div>
                    <div class="lg:text-sm text-xs text-white">
                    Following
                    </div>
                </div>
                <div class="text-center">
                    <div class="lg:text-4xl text-2xl text-green-500 font-bold">
                    {profile.followers.total}
                    </div>
                    <div class="lg:text-sm text-xs text-white">
                    Followers
                    </div>
                </div>
                <div class="text-center">
                    <div class="lg:text-4xl text-2xl text-green-500 font-bold">
                    {playlist.total}
                    </div>
                    <div class="lg:text-sm text-xs text-white">
                    Playlist
                    </div>
                </div>
                </div>
                <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 
                    border-4 border-slate-400 rounded-full shadow
                    font-bold lg:py-3 lg:px-5 px-3 py-1
                    relative mb-2 block transition-all 
                    duration-300 ml-auto mr-auto lg:text-xl text-sm font-bold tracking-wider">
                LOGOUT
                </button>
            </div>
        </div>


        <div class="grid lg:grid-flow-col grid-col-auto p-3 mr-auto ml-auto gap-2 max-w-screen-lg">
            <div class="col-span-2 w-full">
                <div class = "flex -mb-4">
                    <strong class = "mr-auto font-bold text-2xl p-3 text-white tracking-wide">Your Top Artists</strong>
                    <div class = "p-3 ml-auto">
                        <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold lg:py-2 lg:px-3 py-1 px-2 border-2 
                            border-slate-400 rounded-full shadow tracking-wide lg:text-sm text-xs">SEE MORE</button>
                    </div>
                </div>

                <div class="p-3">
                    {artists}
                </div>
            </div>

            <div class="col-span-2 w-full">
                <div class = "flex -mb-4">
                    <strong class = "mr-auto font-bold text-2xl p-3 text-white tracking-wide">Your Top Tracks</strong>
                    <div class = "p-3 ml-auto">
                    <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold lg:py-2 lg:px-3 py-1 px-2 border-2 
                            border-slate-400 rounded-full shadow tracking-wide lg:text-sm text-xs">SEE MORE</button>
                    </div>
                </div>

                <div class="max-w-10/12 p-3">
                    {tracks}
                </div>
            </div>
        </div>
    </div>

  )
}


