import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }
  
  return (
    <div
      className="d-flex align-items-center bg-[#414652] hover:bg-[#292f3d] border-t-2 border-gray-500 p-2"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "70px", width: "70px" }} alt="album"/>
      <div className="ml-3">
        <div class = "text-slate-50 text-lg">{track.title}</div>
        <div className="text-slate-300">{track.artist}</div>
      </div>
    </div>
  )
}