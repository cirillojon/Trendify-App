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

    const [topArtistShortTerm, setTopArtistShortTerm] = useState();
    const [topArtistMedTerm, setTopArtistMedTerm] = useState();

    const [topTracksShortTerm, setTopTracksShortTerm] = useState();
    const [topTracksMedTerm, setTopTracksMedTerm] = useState();

    // ACCESS TOKEN
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])
    
    // AUTHENTICATED USER
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMe().then(res => {
            setUser(res.body)
        });
    }, [accessToken])

    // FOLLOWING 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getFollowedArtists().then(
            function(data) {
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
                //console.log('Retrieved playlists', data.body);
                setPlaylist(data.body);
            },
            function(err) {
            console.log('Something went wrong..', err.message);
            }
    );}, [accessToken, user])

    // TOP ARTISTS
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopArtists({limit : 50 , time_range: "long_term"})
        .then(function(data) {
            let topArtists = data.body.items;
            setTopArtists(topArtists);

            spotifyApi.getMyTopArtists({limit : 50 , time_range: "medium_term"})
            .then(function(data) {
                let topArtists = data.body.items;
                setTopArtistMedTerm(topArtists);

                spotifyApi.getMyTopArtists({limit : 50 , time_range: "short_term"})
                .then(function(data) {
                    let topArtists = data.body.items;
                    setTopArtistShortTerm(topArtists);
                });
            });
        });
    }, [accessToken])

    // TOP TRACKS 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopTracks({limit : 50 , time_range: "long_term"})
        .then(function(data) {
            let topTracks = data.body.items;
            setTopTracks(topTracks)

            spotifyApi.getMyTopTracks({limit : 50 , time_range: "medium_term"})
            .then(function(data) {
                let topTracks = data.body.items;
                setTopTracksMedTerm(topTracks)

                spotifyApi.getMyTopTracks({limit : 50 , time_range: "short_term"})
                .then(function(data) {
                    let topTracks = data.body.items;
                    setTopTracksShortTerm(topTracks)
                });
            });
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
                            topTracks = {topTracks}
                            topTracksMedTerm = {topTracksMedTerm}
                            topTracksShortTerm = {topTracksShortTerm}
                        /> : 
                        null }
                        {currentPath.includes('/topartist') ? 
                            <Artists     
                            topArtists = {topArtists}
                            topArtistMedTerm = {topArtistMedTerm}
                            topArtistShortTerm = {topArtistShortTerm}
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