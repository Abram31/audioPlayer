// const audioSea = new Audio('audio/sea.mp3');
// const audioTress = new Audio('audio/tress.mp3');
// const audioWater = new Audio('audio/water.mp3');

const body = document.querySelector('body')
const player = document.querySelector('.player')
const wrapper = document.querySelector('.controls')

const playButton = wrapper.querySelector('.play');
const pauseButton = wrapper.querySelector('.pause');
const prevueButton = wrapper.querySelector('.prevue');
const nextButton = wrapper.querySelector('.next');
const audioTrack = wrapper.querySelector('.progress-track')
const audioTrackElepsade = wrapper.querySelector('.progress-elepsade')
const volumeTrack = wrapper.querySelector('.progress-volume-track')
const volumeTrackElepsade = wrapper.querySelector('.progress-volume-elepsade')

const fullTimeBar = wrapper.querySelector('.full-time')
const currentTimeBar = wrapper.querySelector('.time-current')

const nameArtist = wrapper.querySelector('.artistName')
const trackTitle = wrapper.querySelector('.trackTitle')
// audio.play();







playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
nextButton.addEventListener('click', indexTrackNext);
prevueButton.addEventListener('click', indexTrackPrevue);
audioTrack.addEventListener('click', currentTimeBarFunction);
audioTrack.addEventListener('mousedown', scrollTime);
volumeTrack.addEventListener('click', currentVolume)
volumeTrack.addEventListener('mousedown', scrollVolume);
// audioTrack.addEventListener('mousedown', log);

const audioTracks = [
    audioSea = {
        artist: 'Voices of nature',
        title: 'Sea',
        track: new Audio('audio/sea.mp3'),
        background: 'icons/sea.jpg',
    }, 
    audioTress = {
        artist: 'Voices of nature',
        title: 'Tress',
        track: new Audio('audio/tress.mp3'),
        background: 'icons/tress.jpg',
    },  
    audioWater = {
        artist: 'Voices of nature',
        title: 'Water',
        track: new Audio('audio/water.mp3'),
        background: 'icons/water.jpg',
    }
];


    let numberTrack = 0;
    


// --------------------------------------BACKGROUND--------------------------------------------------

    function changeBackground(params) {
        body.style.backgroundImage = `url(${audioTracks[numberTrack].background})`
        player.style.backgroundImage = `url(${audioTracks[numberTrack].background})`
    }

    // ----------------------------------------------CHANGE ARTIST,TITLE -----------------------------

    function changeArtist(params) {
        nameArtist.innerHTML = audioTracks[numberTrack].artist;
        trackTitle.innerHTML = audioTracks[numberTrack].title;

        
    }


// -------------------------------------------------BUTTONS---------------------------------------------------------------------------

// let track = audioTracks[numberTrack].track;                      / почему при объеявлении этой переменной не работает переключение треков

console.log(numberTrack);
function playAudio() {
    
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
    audioTracks[numberTrack].track.play();
    changeBackground();
    changeArtist();
}
function pauseAudio() {
    playButton.classList.toggle('hide')
    pauseButton.classList.toggle('hide')
    audioTracks[numberTrack].track.pause();
}

function indexTrackNext() {
    audioTracks[numberTrack].track.pause();
    if (numberTrack < audioTracks.length - 1) {
        numberTrack +=1;
        audioTracks[numberTrack].track.currentTime = 0;
        playAudio();
    } else { 
        numberTrack = 0;
        audioTracks[numberTrack].track.currentTime = 0;
        playAudio();
    }
    console.log(numberTrack);
}

function indexTrackPrevue() {
    audioTracks[numberTrack].track.pause();
    if (numberTrack > 0) {
        numberTrack -= 1;
        audioTracks[numberTrack].track.currentTime = 0;
        playAudio();
    } else {
        numberTrack = audioTracks.length - 1;
        audioTracks[numberTrack].track.currentTime = 0;
        playAudio();
    }
    console.log(numberTrack);
}


// -----------------------------------PROGRESS BAR---------------------------------------------------------------------
setInterval(item => {
    audioTrackElepsade.style.flexBasis = audioTracks[numberTrack].track.currentTime / audioTracks[numberTrack].track.duration * 100 + '%'

}, 200)
function currentTimeBarFunction(event) {
    let positionEvent = event.offsetX;
    let widthProgress = audioTrack.offsetWidth;
    let fullTimeTrack = audioTracks[numberTrack].track.duration;
    let currentTimeAudio = audioTracks[numberTrack].track.currentTime;
    console.log(positionEvent);
    console.log(widthProgress);
    console.log(fullTimeTrack);


    
    audioTracks[numberTrack].track.currentTime = positionEvent / widthProgress * fullTimeTrack;
    audioTrackElepsade.style.flexBasis = positionEvent/widthProgress * 100 + '%';
    console.log('Время');
}

function scrollTime () {
    audioTrack.addEventListener('mousemove', currentTimeBarFunction);
    document.addEventListener('mouseup', function () {                         //////////////////как правильно удалить это событие?
        audioTrack.removeEventListener('mousemove', currentTimeBarFunction);
        
    });
}

// ----------------------------------------------- COUNT TIME--------------------------------------------------

setInterval(item => {
    
     function currentTimeCount () {
         let minutes = Math.trunc((audioTracks[numberTrack].track.currentTime) / 60)
         let seconds;
         if ( Math.trunc(audioTracks[numberTrack].track.currentTime) - (minutes * 60) < 10) {
             seconds = `0${Math.trunc(audioTracks[numberTrack].track.currentTime) - (minutes * 60)}` ;
             
         } else {seconds = Math.trunc(audioTracks[numberTrack].track.currentTime) - (minutes * 60)}  
    
         return `${minutes}:${seconds}`   
     } 

    currentTimeBar.innerHTML = currentTimeCount();
}, 300)

setInterval(item => {
    function fullTimeCount(params) {
        let minutes = Math.trunc((audioTracks[numberTrack].track.duration - audioTracks[numberTrack].track.currentTime) / 60);
        let seconds = Math.abs(Math.trunc(audioTracks[numberTrack].track.currentTime - audioTracks[numberTrack].track.duration)) % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`; 
        } 
        return `${minutes}:${seconds}`
    }

    fullTimeBar.innerHTML = fullTimeCount();

},300)





// console.log(audioTracks[numberTrack]);
// console.log(audioTracks[numberTrack].currentTime)
// console.log(audioTrackElepsade.style.flexBasis);


// console.log(positionEvent);
// console.log(widthProgress);


// -------------------------------------------------Volume progress--------------------------------------

function currentVolume(event) {
    let positionEvent = event.offsetX;
    let widthProgress = volumeTrack.offsetWidth;
    // let fullTimeTrack = volumeTrack.duration;
    // let currentTimeAudio = audioTracks[numberTrack].currentTime;

    // track = 
    audioTracks[numberTrack].track.volume = positionEvent / widthProgress;
    volumeTrackElepsade.style.flexBasis = positionEvent / widthProgress * 100 + '%';

}

function scrollVolume() {
    volumeTrack.addEventListener('mousemove', currentVolume);
    document.addEventListener('mouseup', function () {                         //////////////////как правильно удалить это событие?
        volumeTrack.removeEventListener('mousemove', currentVolume);

    });
}
