import { songsList } from './songs.js';
import PlayInfo from './playinfo.js';
import TrackBar from './trackbar.js';

const Playlist = (_ => {
    // state
    const state = {
        songs: songsList,
        currentlyPlayingIndex: 0
    }

    let { songs, currentlyPlayingIndex } = state,
        currentSong = new Audio(songs[currentlyPlayingIndex].url);

    // cache the DOM
    const playlistEl = document.querySelector('.playlist__list');

    const listeners = _ => {
        playlistEl.addEventListener('click', event => {
            if (event.target.matches('.fas')) {
                let itemElem = event.target.parentElement.parentElement,
                    itemElemIndex = [...itemElem.parentElement.children].indexOf(itemElem);
                
                if (currentlyPlayingIndex === itemElemIndex) {
                    togglePlayPause();
                    toggleIcon();
                    render();
                    PlayInfo.setState({
                        songsLength: songs.length,
                        isPlaying: !currentSong.paused
                    })
                } else {
                    mainPlay(itemElemIndex);
                    PlayInfo.setState({
                        songsLength: songs.length,
                        isPlaying: !currentSong.paused
                    })
                }
            }
        })

        // play next
        currentSong.addEventListener('ended', _ => {
            playNext();
        })

        // progress bar
        currentSong.addEventListener('timeupdate', _ => {
            console.log(currentSong.currentTime);
            TrackBar.setState({
                currentTrackTime: currentSong.currentTime,
                fullTrackTime: currentSong.duration
            });
        })
    }

    const playNext = _ => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
            changeAudioSrc();
            currentSong.play();
            render();
        }
    }

    const mainPlay = clickedIndex => {
        currentlyPlayingIndex = clickedIndex;
        changeAudioSrc();
        currentSong.play();
        render();
    }

    const changeAudioSrc = _ => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const togglePlayPause = _ => {
        currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const toggleBtn = _ => {
        togglePlayPause();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
        render();
    }

    const toggleIcon = songIndex => {
        if(currentlyPlayingIndex === songIndex) {
            return currentSong.paused ? 'fa-play' : 'fa-pause';
        }
         return 'fa-play';
    }

    const init = _ => {
        listeners();
        render();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const render = _ => {
        renderPlaylist();
    }

    const renderPlaylist = _ => {
        let markup = '';

        songs.forEach((song, index) => {
            markup += `
                    <li class="playlist__song ${currentlyPlayingIndex === index ? 'playlist__song--active' : ''}">
                        <section class='song__left'>
                            <i class='fas ${toggleIcon(index)} ${currentlyPlayingIndex === index ? 'playlist__icon--active' : ''}'></i>
                            <section class="song__info">
                                <p class='song__name'>${song.title}</p>
                                <p class='song__artist'>${song.artist}</p>
                            </section>
                        </section>
                        <span class='song__duration'>${song.time}</span>
                    </li>
            `;
        })
        playlistEl.innerHTML = markup;
    }

    return {
        init,
        toggleBtn
    }
})();

export default Playlist;