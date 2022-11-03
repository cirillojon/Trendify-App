import { useState, useEffect } from "react"
import useAuth from "../components/spotify.useAuth"
import Player from "../components/spotify.player"
import TrackSearchResult from "../components/spotify.trackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import { Container, Form } from "react-bootstrap"


import Profile from "../components/spotify.profile"
import Nav from "../components/spotify.nav"

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

    const [user, setUser] = useState();
    const [numFollowing, setNumFollowing] = useState();
    const [playlist, setPlaylist] = useState();
    const [topArtists, setTopArtists] = useState();
    const [topTracks, setTopTracks] = useState();

function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
}

// ACCESS TOKEN
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

// USER PROFILE
useEffect(() => {
    if(!accessToken) return
    spotifyApi.getMe().then(res => {
        console.log(res.body)
        setUser(
            res.body
        )
        
    });
}, [accessToken])

// FOLLOWING 
useEffect(() => {
    if(!accessToken) return
    spotifyApi.getFollowedArtists().then(
        function(data) {
          console.log("FOLLOWED ARTISTS " + data.body.artists.total);
          setNumFollowing(data.body.artists.total);
        },
        function(err) {
          console.log('Something went wrong..', err.message);
        }
);}, [accessToken])

// PLAYLIST 
useEffect(() => {
    if(!accessToken) return
    if(!user) return
    spotifyApi.getUserPlaylists(user.id).then(
        function(data) {
            console.log('Retrieved playlists', data.body);
            setPlaylist(data.body);
        },
        function(err) {
          console.log('Something went wrong..', err.message);
        }
);}, [accessToken, user])

// TOP ARTISTS
useEffect(() => {
    if(!accessToken) return
    spotifyApi.getMyTopArtists()
    .then(function(data) {
      let topArtists = data.body.items;
      console.log(topArtists);
      setTopArtists(topArtists);
    }, function(err) {
      console.log('Something went wrong!', err);
    }
);}, [accessToken])

// TOP TRACKS
useEffect(() => {
    if(!accessToken) return
    spotifyApi.getMyTopTracks({time_range: "long_term"})
    .then(function(data) {
        let topTracks = data.body.items;
        console.log("your top tracks", topTracks);
        setTopTracks(topTracks)
    }, function(err) {
        console.log('Something went wrong!', err);
    }
);}, [accessToken])



return (
    <div class = "bg-[#111827] min-h-screen font-poppins">
        <Nav/>
        <Profile 
            profile = {user}
            numFollowing = {numFollowing}
            playlist = {playlist}
            topTracks = {topTracks}
            topArtists = {topArtists}
        />
    </div>
)
}
  