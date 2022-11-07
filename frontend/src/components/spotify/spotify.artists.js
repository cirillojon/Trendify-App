import React from "react"
import {NavLink} from 'react-router-dom'
import {useEffect, useState} from 'react'
import SpotifyWebApi from "spotify-web-api-node"

export default function Artists({ profile, numFollowing, playlist, topTracks, topArtists, setTimeRange }) {

  const artists = topArtists.slice(0, 20).map((artist) => {
    return (
        <a href = {artist.external_urls.spotify} target="_blank" rel="noopener noreferrer"
        class="justify-self-center inline-block rounded-2xl h-20 no-underline duration-200 w max-w-1/4 min-w-200 mb-32 mr-20">
            <div class="flex rounded-full justify-items-center">
                <a href = {artist.external_urls.spotify} 
                 target="_blank" rel="noopener noreferrer"
                 class=" filter hover:grayscale hover:contrast-100">
                    <img alt = "profile-profile" draggable="false" src={artist.images[2].url} 
                    class=" object-content pr-auto lg:w-40 lg:h-40 w-24 h-24 rounded-full aspect-square "/>
                </a>
            </div>
            <div class = "lg:w-40 w-24 mt-2 flex place-content-center max-w-full">
              <a target="_blank" rel="noopener noreferrer" href = {artist.external_urls.spotify}
              class = "no-underline hover:text-green-500 text-slate-50 hover:text-sky-300">
                <p class="justify-center lg:text-xl text-md font-medium">{artist.name}</p>
              </a>
            </div>
        </a>
    )
  });
  
  return (
    <div class="col-span-2 lg:pl-24">
        <div class = " flex mb-6">
          <strong class = "align-center mr-auto font-bold text-4xl p-4 text-white tracking-wide">Your Top Artists</strong>
          <div class=" text-sm p-4 text-white tracking-wide space-x-10 m-2">
            <button onClick={() => setTimeRange('short_term')} class="hover:text-green-500 px-3 py-1 bg-gray-500 mt-4 bg-opacity-10 border-2 border-black rounded ">Past Month</button>
            <button onClick={() => setTimeRange('medium_term')} class="hover:text-green-500 px-3 py-1 bg-gray-500 mt-4 bg-opacity-10 border-2 border-black rounded ">6 Months</button>
            <button onClick={() => setTimeRange('long_term')} class="hover:text-green-500 px-3 py-1 bg-gray-500 mt-4 bg-opacity-10 border-2 border-black rounded ">All-Time</button>
          </div>
            <NavLink exact to='/topartist'>
                <div class = "p-3 ml-auto">

                </div>
            </NavLink>
        </div>

        <div class="ml-24 p-3 justify-around lg:grid-cols-4 grid-cols-3 sm:grid-cols-3  grid gap-56">
            {artists}
        </div>
    </div>
    )
  }
