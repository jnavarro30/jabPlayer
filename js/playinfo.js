import Playlist from './playlist.js';

const PlayInfo = (_ => {
    // state
    const state = {
        songsLength: 0,
        isPlaying: false
    }

    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    // cache the DOM
    const playInfoSongs = document.querySelector('.playinfo__songs'),
          playInfoBtn = document.querySelector('.playinfo__btn');

    const init = _ => {
        listeners();
        
    }

    const listeners = _ => {
        playInfoBtn.addEventListener('click', _ => {
            Playlist.toggleBtn();
            render();
        })
    }

    const render = _ => {
        playInfoSongs.innerHTML = `${state.songsLength} Songs`;
        playInfoBtn.innerHTML = `${state.isPlaying ? 'PAUSE' : 'PLAY'}`;
    }

    return {
        init,
        setState
    }
})();

export default PlayInfo;