export default function TrackInfo({song}) {
    if(!song) return;
    return(
        <a href = {`/track/${song.id}/${song.title.replace('/', '')}/${song.album.replace('/', '')}/${song.artist.replace('/', '')}`} target="_blank" rel="noopener noreferrer"
            class="bg-[#292f3d] hover:bg-[#3e4450] 
                rounded p-3 mr-auto ml-auto w-fit lg:mt-20 m-auto sm:mb-3 
                duration-500 no-underline
                hover:scale-105 transition duration-200 ease-in-out">
            <div class="group relative">
                <img class="w-full md:w-64 w-48 block mr-auto ml-auto" src={song.albumArt} alt="" draggable="false"/>
            </div>
            <div class="p-2">
                <h3 class="text-white lg:text-2xl md:text-xl text-lg mb-1 overflow-hidden truncate lg:w-60 w-44">{song.title}</h3>
                <p class="text-gray-400 -mb-1 overflow-hidden truncate lg:w-60 md:w-44 w-36 lg:text-md text-sm">{song.album}</p>
                <p class="text-gray-400 -mb-1 overflow-hidden truncate lg:w-60 md:w-44 w-36 lg:text-md text-sm">{song.artist}</p>
            </div>
        </a>
    )
}