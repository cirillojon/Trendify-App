import React from "react"

export default function Profile({ profile, numFollowing, playlist, topTracks, topArtists }) {
    if (!profile || !numFollowing || !playlist|| !topTracks || !topArtists ) return;

    const artists = topArtists.slice(0, 10).map((artist) => {
        return (
            <article class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3 h-20">
                <span class="rounded-full ml-3">
                    <img alt = "profile-profile" src={artist.images[2].url} 
                    class="object-scale-down pr-auto w-14 h-14 rounded-full aspect-square "/>
                </span>
                <div class = "mt-2">
                    <p class="text-xl font-medium text-white">{artist.name}</p>
                </div>
            </article>
        )
    })

    const tracks = topTracks.slice(0, 10).map((track) => {
        return (
            <article class="flex items-center gap-3 rounded-2xl bg-[#292f3d] mb-3">
                <span class="rounded-full ml-3">
                    <img alt = "profile-profile" src={track.album.images[0].url} class="aspect-square w-14 h-14 rounded-full"/>
                </span>
                <div class = "mt-2">
                    <p class="text-xl font-medium text-white">{track.name}</p>
                    <p class="text-sm -mt-4 text-slate-300">{track.album.name}</p>
                    <p class="text-xs -mt-4 text-slate-400">{track.artists[0].name}</p>
                </div>
            </article>
        )
    })

  return (
    <div class = "w-5/6 ml-auto mr-auto px-8 lg:ml-40 lg:px-12 lg:py-6 min-h-screen overflow-hidden">
        <div class = "flex pt-20 justify-center w-auto h-auto">
            <div class = "w-auto h-auto">
                <div>
                    <img alt = "profile-profile" src={profile.images[0].url} class="w-40 h-auto rounded-full"/>
                </div>
                <div class = "pt-3">
                    <a target="_blank" rel="noopener noreferrer" class="text-5xl font-bold no-underline hover:underline text-sky-50 hover:text-sky-300" href = {profile.external_urls.spotify} >{profile.display_name}</a>
                </div>
            </div>
        </div>
        <div class="flex p-auto justify-center">
            <div class="p-5 text-center">
                <span class="p-1 text-4xl font-extrabold block uppercase tracking-wide text-[#8f4db7]">{profile.followers.total}</span>
                <span class="text-sm font-medium text-slate-300 tracking-wider">FOLLOWERS</span>
            </div>

            <div class="p-5 text-center">
                <span class="p-1 text-4xl font-extrabold block uppercase tracking-wide text-[#8f4db7]">{numFollowing}</span>
                <span class="text-sm font-medium text-slate-300 tracking-wider">FOLLOWING</span>
            </div>

            <div class="p-5 text-center">
                <span class="p-1 text-4xl font-extrabold block uppercase tracking-wide text-[#8f4db7]">{playlist.total}</span>
                <span class="text-sm font-medium text-slate-300 tracking-wider">PLAYLISTS</span>
            </div>
        </div>

        <div class="grid grid-flow-col p-3 mr-auto ml-auto gap-2 max-w-screen-lg">
            <div class="col-span-2 w-full">
                <div class = "flex -mb-4">
                    <strong class = "mr-auto font-bold text-2xl p-3 text-white tracking-wide">Your Top Artists</strong>
                    <div class = "p-3 ml-auto">
                        <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold py-2 px-3 border-2 
                            border-slate-400 rounded-full shadow tracking-wide text-sm">SEE MORE</button>
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
                        <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold py-2 px-3 border-2 
                            border-slate-400 rounded-full shadow tracking-wide text-sm">SEE MORE</button>
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


