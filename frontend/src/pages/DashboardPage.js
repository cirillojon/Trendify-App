import { useState, useEffect } from "react"
import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node"

import Nav from "../components/spotify/spotify.nav"
import Profile from "../components/spotify/spotify.profile"
import Tracks from "../components/spotify/spotify.tracks"
import Artists from "../components/spotify/spotify.artists"
import Player from "../components/spotify/spotify.player"
import Playlists from "../components/spotify/spotify.playlists"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
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
    const [recents, setRecents] = useState();

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
            setUser(res.body)
        });
    }, [accessToken])

    // FOLLOWING 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getFollowedArtists().then(
            function(data) {
            //console.log("FOLLOWED ARTISTS " + data.body.artists.total);
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
        spotifyApi.getMyTopArtists({time_range: timeRange})
        .then(function(data) {
        let topArtists = data.body.items;
        //console.log(topArtists);
        setTopArtists(topArtists);
        }, function(err) {
        console.log('Something went wrong!', err);
        }
    );}, [accessToken, timeRange])

    // TOP TRACKS 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopTracks({time_range: "long_term"})
        .then(function(data) {
            let topTracks = data.body.items;
            //console.log("your top tracks", topTracks);
            setTopTracks(topTracks)
        }, function(err) {
            console.log('Something went wrong!', err);
        }
    );}, [accessToken])
    
    // SHOW RECENTLY PLAYED TRACKS
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyRecentlyPlayedTracks({
            limit : 50
        }).then(function(data) {
            // Output items
            setRecents(data.body.items)
            console.log(data.body.items);
        }, function(err) {
            console.log('Something went wrong!', err);
        }
    );}, [accessToken])


    return (
        <div class = "bg-[#111827] min-h-screen font-poppins">
            <Nav />
            <>
                {user && numFollowing && topTracks && topArtists && accessToken ?
                    <div>
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
                        {currentPath.includes('/player') ? 
                            <Player 
                                accessToken={accessToken}
                                user = {user}
                            /> : 
                        null }
                        {currentPath.includes('/playlist') ? 
                            <Playlists     
                            playlist = {playlist}
                            recents = {recents}
                            /> : 
                        null }
                    </div>
                :
                <div class = "flex h-screen justify-center items-center">
                      <div class="
                        spinner-border
                        animate-spin
                        inline-block
                        w-8
                        h-8
                        border-4
                        rounded-full
                        text-purple-500
                        " role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                }
            </>
        </div>
)}