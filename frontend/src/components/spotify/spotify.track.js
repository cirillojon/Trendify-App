import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import SpotifyWebApi from "spotify-web-api-node"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'

const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
};

const spotifyApi = new SpotifyWebApi({
    clientId: "abb24fee7b8443d3bab993fe8504fbab",
})


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

            spotifyApi.searchTracks(`track: ${title} album: ${album}}`)
            .then(function(songData) {
                console.log(songData.body)
                setSong( songData.body)
            });

        }, function(err) {
            console.log(err);
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
			{song && features ? 
                <div class = "flex flex-col gap-4" >
                    <a href={song.tracks.items[0].external_urls.spotify} target="_blank" rel="noreferrer" 
                        class="bg-[#292f3d] shadow-lg rounded p-3 mr-auto ml-auto no-underline
                            hover:bg-[#3e4450]">
                        <div class="group relative">
                            <img class="w-full md:w-64 w-48 block rounded" src={song.tracks.items[0].album.images[0].url} alt="" />
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
						<h3 class='text-2xl heading mb-2 mt-2 text-slate-50 text-center'>Track Features</h3>
						<div class=''>
                            <Bar
                                width={300}
                                height={300}
                                data={feats}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: {
                                          grid: {color: 'rgba(255, 255, 255, 0.3)'},
                                        },
                                        xAxes: {
                                          grid: {color: 'rgba(255, 255, 255, 0.3)'},
                                        },
                                    }
                                }}
                                />
						</div>
					</div>

				</div>
				: 
				<div class='loader' />
			}
		</div>
    )
  };
  
  export default Track;

