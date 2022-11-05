export default function TrackInfo({song}) {
    if(!song) return;
    return(
        <div class="bg-[#292f3d] shadow-lg rounded p-3 mr-auto ml-auto w-fit lg:mt-12 mt-1 sm:mb-3">
        <div class="group relative">
            <img class="w-full md:w-64 w-48 block rounded mr-auto ml-auto" src={song.albumArt} alt="" />
        </div>
        <div class="p-2">
            <h3 class="text-white lg:text-xl text-md lg:-mb-1 overflow-hidden truncate lg:w-60 w-44 ">{song.title}</h3>
            <p class="text-gray-400 -mb-1 overflow-hidden truncate lg:w-60 w-36 ">{song.album}</p>
            <p class="text-gray-400 -mb-1">{song.artist}</p>
        </div>
        </div>
    )
}