import { useState, useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import Playback from "./player/Playback"
import Error from "./player/ErrorMessage"
import TrackInfo from "./player/TrackInfo"
import TrackSearchResult from "./player/TrackSearchResult"
import { Container } from "react-bootstrap"
import trendiPlayerLogo from "../../images/TrendiPlayer.png"


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
})

export default function Player({ accessToken, user }) {   
  if (!accessToken){
    accessToken = localStorage.getItem("accessToken");
  } 
    // ACCESS TOKEN
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  // Music Player
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [song, setSong] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }

  useEffect(() => {
    if (!playingTrack) return
    setSong(playingTrack)
  }, [playingTrack, song])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return
    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(
          res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
              },
              track.album.images[0]
              )
              return {
                album: track.album.name,
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
                albumArt: track.album.images[0].url,
                id: track.id
              }
          })
        )
  })
  return () => (cancel = true)
  }, [search, accessToken])


  return (
    <div class ="lg:pt-8 pt-4 lg:h-screen h-fit lg:w-1/2 mr-auto ml-auto">
          <h1 class="text-slate-50 text-5xl lg:mt-10 mt-2 text-center font-bold lg:mb=1 -mb-4 flex justify-center items-center space-x-2">
            <img select draggable="false" class="flex items-center pb-4 lg:w-72 w-52" src={trendiPlayerLogo} alt="Trendify"></img> 
          </h1>
        {user.product === "premium" ? 
        <Container className="d-flex flex-column p-4 lg:h-5/6 h-4/5 rounded-lg ">
          <input
            class="block lg:p-4 p-3 lg:pl-10 pl-8 w-full text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 bg-gray-700 hover:bg-gray-600 placeholder-gray-400 text-white"
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex-grow-1 my-2 overflow-y-auto">
            {searchResults.map(track => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
            <div class = "flex lg:h-5/6 h-4/5">
              <TrackInfo song = {song}/>
            </div>
          </div>
          <div>
            <Playback 
              accessToken={accessToken}
              trackUri = {playingTrack?.uri} />
          </div>
        </Container>
        :
        <Error
          accessTokenError = {false}
          spotifyPremiumError = {true}/>
        }
    </div>
)}