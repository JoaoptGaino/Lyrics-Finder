import React, { useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    function findLyrics(title, artist) {
        return axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    }

    async function doSubmit() {
        const lyrics_el = document.querySelector('#lyrics');
        const artist = document.querySelector('#artist');
        const song = document.querySelector('#song');

        lyrics_el.innerHTML = '<div className="spinner-grow" role="status"><span className="sr-only">Loading...</span></div>';

        try {
            const lyricsResponse = await findLyrics(song.value, artist.value);
            const data = await lyricsResponse.data.lyrics;
            if(data){
                lyrics_el.innerHTML = data;
            }else{
                lyrics_el.innerHTML = data.error;
            }
        }catch(err){
            lyrics_el.innerHTML = "Cannot find lyrics, please make sure you wrote the write name";
            lyrics_el.style.color = 'red';
            console.log(err);
        }
    }
    useEffect(() => {
        const form = document.querySelector('#lyricsForm');
        form.addEventListener('submit', el => {
            el.preventDefault();
            doSubmit();
        })
    })

    return (
        <div className="container justify-content-center">
            <form id="lyricsForm">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Lyrics Finder</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="song">Song title</label>
                                    <input className="form-control" type="text" name="song" id="song" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="artist">Artist name</label>
                                    <input className="form-control" type="text" name="artist" id="artist" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-info">Search</button>
                    </div>
                </div>
            </form>

            <div className="row justify-content-center">
                <pre className="mt-4" id="lyrics"></pre>
            </div>
        </div>
    )
}
export default Home;