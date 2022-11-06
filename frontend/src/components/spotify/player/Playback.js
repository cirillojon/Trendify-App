import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Playback({ accessToken, trackUri }) {
  console.log(trackUri)
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        height: 70,
        activeColor: '#65d46e',
        bgColor: '#111827',
        color: '#fdfdff',
        errorColor: '#aa0b06',
        loaderColor: '#aa0b06',
        sliderHandleColor: '#a247db',
        sliderTrackBorderRadius: 10,
        sliderColor: '#c791e9',
        sliderHeight: 5,
        trackArtistColor: '#7c7b7c',
        trackNameColor: '#fdfdff',
      }}
    />
  )
}