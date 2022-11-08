import React from "react"
import {NavLink} from 'react-router-dom'
import ErrorMessage from "./spotify.error"

export default function Profile({ profile, numFollowing, playlist, topTracks, topArtists }) {
    if (!profile || !numFollowing || !playlist|| !topTracks || !topArtists ) return;
    if(topArtists.length < 10 || topTracks.length < 10) {
        return (
            <ErrorMessage />
        )
    } 

    const artists = topArtists.map((artist) => {
        return (
            <a href = {artist.external_urls.spotify} target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 h-20 hover:bg-[#3e4450] 
                no-underline text-slate-50 hover:text-sky-300
                hover:scale-105 transition duration-300 ease-in-out">
                <span class="rounded-full ml-3">
                    <a href = {artist.external_urls.spotify} 
                            target="_blank" rel="noopener noreferrer"
                            class="filter hover:grayscale hover:contrast-100">
                        <img alt = "profile-profile" draggable="false" src={artist.images[2].url} 
                        class="object-content pr-auto lg:w-14 lg:h-14 w-12 h-12 rounded-full aspect-square "/>
                    </a>
                </span>
                <div class = "mt-2">
                    <p class="lg:text-xl text-md font-medium">{artist.name}</p>
                </div>
            </a>
        )
    })

    const tracks = topTracks.map((track) => {
        return (
            <a href = {`/track/${track.id}/${track.name.replace('/', '')}/${track.album.name.replace('/', '')}/${track.artists[0].name.replace('/', '')}`} target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 hover:bg-[#3e4450] no-underline duration-200
                    hover:scale-105 transition duration-300 ease-in-out text-slate-50 hover:text-sky-300">
                <span class="rounded-full ml-3">
                    <a href = {track.external_urls.spotify} 
                        target="_blank" rel="noopener noreferrer"
                        class="filter hover:grayscale hover:contrast-100">
                    <img alt = "profile-profile" draggable="false" src={track.album.images[2].url} 
                        class="object-content lg:w-14 lg:h-14 w-12 h-12 rounded-full "/>
                    </a>
                </span>
                <div class = "mt-2">
                    <p class = "overflow-hidden truncate lg:w-60 w-48"> 
                        {track.name}
                    </p>
                    <p class="lg:text-sm text-xs -mt-4 text-slate-300 overflow-hidden truncate w-48">{track.album.name}</p>
                    <p class="lg:text-xs text-xs -mt-4 text-slate-400 overflow-hidden truncate w-48">{track.artists[0].name}</p>
                </div>
            </a>
        )
    })

    // Check if user have a profile picture, 
    // if they don't the picture of their top artist will be set as their picture
    const avatarImage = (profile.images.length === 0) ? 
    `${topArtists[0].images[0].url}` : `${profile.images[0].url}`;

  return (
    <div class = "ml-auto mr-auto lg:px-10 px-2 pb-20">
        <div class="ml-auto mr-auto min-h-fit lg:w-3/6 flex items-center justify-center">
            <div class="p-6 rounded-xl w-full">
                <img draggable="false" src={topTracks[0].album.images[0].url}
                    class="rounded-xl h-60 w-full object-cover shadow" alt=""/>
                <div class="flex justify-center relative">
                <img draggable="false" alt = "profile" src={avatarImage} 
                    class="w-32 h-32 object-cover rounded-full border-8 border-[#111827] shadow absolute -top-16" />
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
                <a href = "/" class = "no-underline">
                    <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 
                        border-4 border-slate-400 rounded-full shadow
                        font-bold lg:py-3 lg:px-5 px-3 py-1
                        relative mb-2 block transition-all 
                        duration-300 ml-auto mr-auto lg:text-xl text-sm font-bold tracking-wider">
                    LOGOUT
                    </button>
                </a>

            </div>
        </div>


        <div class="grid lg:grid-flow-col grid-col-auto p-3 mr-auto ml-auto gap-2 max-w-screen-lg">
            <div class="col-span-2 w-full">
                <div class = "flex -mb-4">
                    <strong class = "mr-auto font-bold text-2xl p-3 text-white tracking-wide">Your Top 10 Artists</strong>
                    <NavLink exact to='/topartist'>
                        <div class = "p-3 ml-auto">
                            <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold sm:py-2 sm:px-3 py-2 px-3 border-2 
                                border-slate-400 rounded-full shadow tracking-wide lg:text-sm text-xs duration-300">SEE MORE</button>
                        </div>
                    </NavLink>
                </div>

                <div class="p-3">
                    {artists}
                </div>
            </div>

            <div class="col-span-2 w-full">
                <div class = "flex -mb-4">
                    <strong class = "mr-auto font-bold text-2xl p-3 text-white tracking-wide">Your Top 10 Tracks</strong>
                    <NavLink exact to='/toptracks'>
                        <div class = "p-3 ml-auto">
                            <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold sm:py-2 sm:px-3 py-2 px-3 border-2 
                                border-slate-400 rounded-full shadow tracking-wide lg:text-sm text-xs duration-300">SEE MORE</button>
                        </div>
                    </NavLink>
                </div>
                <div class="max-w-10/12 p-3">
                    {tracks}
                </div>
            </div>
        </div>
    </div>

  )
}


