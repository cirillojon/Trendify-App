import { useState, useEffect } from "react"
import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node"

import Nav from "../components/spotify/spotify.nav"
import Profile from "../components/spotify/spotify.profile"
import Tracks from "../components/spotify/spotify.tracks"
import Artists from "../components/spotify/spotify.artists"
import Library from "../components/spotify/spotify.library"
import Playlists from "../components/spotify/spotify.playlists"
import Track from "../components/spotify/spotify.track"


const spotifyApi = new SpotifyWebApi({
    clientId: "abb24fee7b8443d3bab993fe8504fbab",
  })
  
export default function Dashboard({ code }) {   
    const currentPath = window.location.pathname;
    const accessToken = useAuth(code);

    localStorage.setItem("accessToken", accessToken);

    // Stores the result from the api calls
    const [user, setUser] = useState();
    const [numFollowing, setNumFollowing] = useState();
    const [playlist, setPlaylist] = useState();
    const [topArtists, setTopArtists] = useState();
    const [topTracks, setTopTracks] = useState();

    const [timeRange, setTimeRange] = useState('medium_term');

    const updateTimeRange = (timeTerm) => {
        setTimeRange(timeTerm);
    } 

    // ACCESS TOKEN
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])


    // AUTHENTICATED USER
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

    // // TOP ARTISTS
    useEffect(() => {
        console.log(timeRange);
        if(!accessToken) return
        spotifyApi.getMyTopArtists({time_range: timeRange})
        .then(function(data) {
        let topArtists = data.body.items;
        console.log(topArtists);
        setTopArtists(topArtists);
        }, function(err) {
        console.log('Something went wrong!', err);
        }
    );}, [accessToken, timeRange])

    // TOP TRACKS
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopTracks()
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
            <Nav />
            {currentPath.includes('/landing') ? 
                <Profile     
                profile = {user}
                numFollowing = {numFollowing}
                playlist = {playlist}
                topTracks = {topTracks}
                topArtists = {topArtists}
                /> : 
            null }
            {currentPath.includes('/toptracks') ? 
                <Tracks path = '/toptracks'      
                profile = {user}
                numFollowing = {numFollowing}
                playlist = {playlist}
                topTracks = {topTracks}
                topArtists = {topArtists}
            /> : 
            null }
            {currentPath.includes('/topartist') ? 
                <Artists     
                profile = {user}
                numFollowing = {numFollowing}
                playlist = {playlist}
                topTracks = {topTracks}
                topArtists = {topArtists}
                setTimeRange = {updateTimeRange}
                /> : 
            null }
            {currentPath.includes('/library') ? 
                <Library /> : 
            null }
            {currentPath.includes('/playlist') ? 
                <Playlists     
                profile = {user}
                numFollowing = {numFollowing}
                playlist = {playlist}
                topTracks = {topTracks}
                topArtists = {topArtists}
                /> : 
            null }
        </div>
)}