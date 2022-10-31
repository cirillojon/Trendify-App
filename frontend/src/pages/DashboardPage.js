import { useState, useEffect } from "react"
import useAuth from "../components/spotify.useAuth"
import Player from "../components/spotify.player"
import TrackSearchResult from "../components/spotify.trackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import { Container, Form } from "react-bootstrap"

const app_name = 'trendify-project'
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production') 
  {
      return 'https://' + app_name +  '.herokuapp.com/' + route;
  }
  else
  {        
      return 'http://localhost:5000/' + route;
  }
}

const spotifyApi = new SpotifyWebApi({
    clientId: "abb24fee7b8443d3bab993fe8504fbab",
  })
  
export default function Dashboard({ code }) {
    console.log(code)
const accessToken = useAuth(code)
const [search, setSearch] = useState("")
const [searchResults, setSearchResults] = useState([])
const [playingTrack, setPlayingTrack] = useState()
const [lyrics, setLyrics] = useState("")

function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
}

useEffect(() => {
    if (!playingTrack) return

    axios
    .get(buildPath("lyrics"), {
        params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
        },
    })
    .then(res => {
        setLyrics(res.data.lyrics)
    })
}, [playingTrack])

useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
}, [accessToken])

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
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
        }
        })
    )
    })

    return () => (cancel = true)
}, [search, accessToken])

return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
    <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
    />
    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
        <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
        />
        ))}
        {searchResults.length === 0 && (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
        </div>
        )}
    </div>
    <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
    </Container>
)
}
  