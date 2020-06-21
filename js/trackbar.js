
const TrackBar = (_ => {
    // state
    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    const setState = obj => {
        state.currentTrackTime = obj.currentTrackTime;
        state.fullTrackTime = obj.fullTrackTime;
        state.fillWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
        render();
    }

    // cache the DOM
    const barEl = document.querySelector('.player__bar');

    const init = _ => {
        render();
    }

    const render = _ => {
        barEl.style.width = `${state.fillWidth}%`;
    }

    const getPercent = (current, full) => {
        return (current / full) * 100;
    }

    return {
        init,
        setState
    }
})();

export default TrackBar;