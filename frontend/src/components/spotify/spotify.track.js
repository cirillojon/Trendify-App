import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-node"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'
import ErrorMessage from "./player/ErrorMessage"
import { formatDuration, parsePitchClass } from './player/spotify.trackUtils';


const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
};

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
})

const gridCSS = "border-[#979792] border-opacity-50 border-solid border-t border-l border-r border-b lg:pb-15 pb-0 lg:px-10 px-2";
const featureLabelCSS = "mb-4 text-xs text-slate-400";
const featureTextCSS = "lg:text-3xl text-xl font-bold mt-4 text-slate-200";

const Track = () => {
    const accessToken = localStorage.getItem("accessToken");
    const { trackId, musicName, albumName, artist } = useParams();
    var obj = {
        trackId: trackId,
        musicName: musicName,
        albumName: albumName,
        artist: artist,
    };

	const [features, setFeatures] = useState([0, 0, 0, 0, 0, 0, 0])
    const [song, setSong] = useState();
    const [audioInfo, setAudioInfo] = useState();
    const [error, setError] = useState();

    const songId = obj.trackId;
    const album = obj.albumName;
    const title = obj.musicName;;

    // ACCESS TOKEN
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])
    // GET SONG INFORMATION
    useEffect(() => 
	{
        if(!accessToken && !songId && !album && !title) return;
        spotifyApi.getAudioFeaturesForTrack(songId)
        .then(function(songFeatures) {
            setFeatures(songFeatures.body);
            console.log(songFeatures.body);

            spotifyApi.searchTracks(`track: ${title} album: ${album}}`)
            .then(function(songData) {
                console.log(songData.body)
                setSong( songData.body)
            });

            spotifyApi.getAudioAnalysisForTrack(songId)
            .then(function(data) {
                console.log(data.body);
                setAudioInfo(data.body);
            });

        }, function(err) {
            console.log(err);
            setError(err);
        });
	}, [songId, album, title, accessToken,])


	const feats = {
		labels: ['Danceability', 'Acousticness', 'Energy', 'Instrumentalness', 'Liveness', 'Valence', 'Speechiness'],
		datasets: [
			{
				label: 'Hide / Unhide',
				backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(104, 132, 245, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
			      ],

			    borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(104, 132, 245, 1)',
                    'rgba(153, 102, 255, 1)',
			      ],
				borderWidth: 1,
				data: [features.danceability*100, features.acousticness*100, features.energy*100, features.instrumentalness*100, features.liveness*100, features.valence*100, features.speechiness*100]
			}
		]
	}


    return (
		<div class='py-10 bg-[#181818] min-h-screen font-poppins'>
            {!error ? 
                <div>
                    {song && features && audioInfo ? 
                        <div class = "flex flex-col gap-4" >
                            <a href={song.tracks.items[0].external_urls.spotify} target="_blank" rel="noreferrer" 
                                class="bg-[#292f3d] shadow-lg rounded p-3 mr-auto ml-auto no-underline
                                    hover:bg-[#3e4450]">
                                <div class="group relative">
                                    <img class="w-full md:w-64 w-48 block rounded" src={song.tracks.items[0].album.images[0].url} alt="" draggable="false"/>
                                </div>
                                <div class="p-2">
                                    <h3 class="text-white lg:text-lg text-sm -mb-1 overflow-hidden truncate lg:w-60 w-44 ">{song.tracks.items[0].name}</h3>
                                    <p class="text-gray-400 -mb-1 overflow-hidden truncate lg:w-60 w-36 ">{song.tracks.items[0].album.name}</p>
                                    <p class="text-gray-400 -mb-1">{song.tracks.items[0].artists[0].name}</p>
                                </div>
                            </a>

                            <button class="hover:bg-slate-400 hover:text-[#292f3d] text-slate-400 font-bold sm:py-4 sm:px-3 py-2 px-4 border-2 
                                        border-slate-400 rounded-full shadow tracking-wide lg:text-sm text-xs duration-300 w-auto mr-auto ml-auto" onClick={closeTab}>Close Tab</button>
                            
                            <div class="graph lg:w-3/5 w-10/12 mr-auto ml-auto rounded p-3">
                                <h3 class='lg:text-3xl text-2xl heading mb-2 mt-2 text-slate-50 text-center'>Track Features</h3>
                                <div class=''>
                                    <Bar
                                        width={300}
                                        height={400}
                                        data={feats}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    labels: {
                                                        font: {
                                                            size: 15
                                                        }
                                                    }
                                                }
                                            },
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                yAxes: {
                                                grid: {color: 'rgba(255, 255, 255, 0.3)'},
                                                ticks: {
                                                    color: "#d7d8d0",
                                                    stepSize: 10
                                                }
                                                },
                                                xAxes: {
                                                grid: {color: 'rgba(255, 255, 255, 0.3)'},
                                                ticks: {
                                                    color: "#d7d8d0"
                                                }
                                                },
                                            }
                                        }}
                                        />
                                </div>
                            </div>

                            <div>
                                <h3 class='lg:text-3xl text-2xl heading mb-3 mt-3 text-slate-50 text-center'>More Track Information</h3>
                                <div class="grid lg:grid-cols-5 grid-cols-3 justify-evenly lg:w-3/5 w-fit ml-auto mr-auto text-center"> 
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{formatDuration(features.duration_ms)}</h4>
                                        <p class = {featureLabelCSS}>Duration</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{parsePitchClass(features.key)}</h4>
                                        <p class = {featureLabelCSS}>Key</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{features.mode === 1 ? 'Major' : 'Minor'}</h4>
                                        <p class = {featureLabelCSS}>Modality</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{features.time_signature}</h4>
                                        <p class = {featureLabelCSS}>Time Signature</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{Math.round(features.tempo)}</h4>
                                        <p class = {featureLabelCSS}>Tempo (BPM)</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{song.tracks.items[0].popularity}</h4>
                                        <p class = {featureLabelCSS}>Popularity</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{audioInfo.bars.length}</h4>
                                        <p class = {featureLabelCSS}>Bars</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{audioInfo.beats.length}</h4>
                                        <p class = {featureLabelCSS}>Beats</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{audioInfo.sections.length}</h4>
                                        <p class = {featureLabelCSS}>Sections</p>
                                    </div>
                                    <div class = {gridCSS}>
                                        <h4 class = {featureTextCSS}>{audioInfo.segments.length}</h4>
                                        <p class = {featureLabelCSS}>Segments</p>
                                    </div>
                                </div> 
                            </div>
                            
            

                        </div>
                        : 
                        <div class='loader' />
                    }
                </div>
                :
                <ErrorMessage
                    accessTokenError = {true}
                    spotifyPremiumError = {false}/>
            }
		</div>
    )
  };
  
  export default Track;

