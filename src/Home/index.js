import React, { useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
    function findLyrics(title, artist) {
        return axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    }

    async function doSubmit() {
        const lyrics_el = document.querySelector('#lyrics');
        //const title_el = document.querySelector('#title');
        const artist = document.querySelector('#artist');
        const song = document.querySelector('#song');

        lyrics_el.innerHTML = '<div className="spinner-grow" role="status"><span className="sr-only">Loading...</span></div>';
        if ((artist.value === "") && (song.value === "")) {
            lyrics_el.innerHTML = 'Please write the name of the song and the artist';
            lyrics_el.style.color = 'red';
            song.focus();
        } else if (song.value === "") {
            lyrics_el.innerHTML = 'Please write the name of the song';
            lyrics_el.style.color = 'red';
            song.focus();
        } else if (artist.value === "") {
            lyrics_el.innerHTML = 'Please write the name of the artist';
            lyrics_el.style.color = 'red';
            artist.focus();
        } else {
            try {
                const lyricsResponse = await findLyrics(song.value, artist.value);
                const data = await lyricsResponse.data.lyrics;
                if (data) {
                    //title_el.innerHTML = `${song.value} by ${artist.value}`;
                    lyrics_el.innerHTML = `<div id='title'>${song.value} by ${artist.value}</div> <br/> ${data}`;
                    lyrics_el.style.color = 'lightgray';
                } else {
                    lyrics_el.innerHTML = data.error;
                }
            } catch (err) {
                lyrics_el.innerHTML = "Cannot find lyrics, please make sure you wrote the write name";
                lyrics_el.style.color = 'red';
                console.log(err);
            }
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
                    <h3 className="title">Lyrics Finder 🤘</h3>
                    <hr />
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="song" id="songLabel">Song title</label>
                                    <input className="form-control" type="text" name="song" id="song" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="artist" id="artistLabel">Artist name</label>
                                    <input className="form-control" type="text" name="artist" id="artist" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="footer">
                        <button className="btn">Search</button>
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