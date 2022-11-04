import React from "react"

export default function Tracks({ profile, numFollowing, playlist, topTracks, topArtists }) {
    if (!profile || !numFollowing || !playlist|| !topTracks || !topArtists ) return;

  return (
    <div class = "ml-auto mr-auto lg:px-10 px-2">
        <div class="p-6 rounded-xl w-full">
            <h1 class="text-slate-50 text-5xl mt-20 text-center font-bold mb-1 flex justify-center items-center space-x-2">
                <span target="_blank" rel="noopener noreferrer" class="lg:text-5xl text-3xl font-bold no-underline hover:underline text-sky-50 hover:text-sky-300"
                    >THIS IS TOP TRACKS</span>
            </h1>
        </div>
    </div>
  )
}


