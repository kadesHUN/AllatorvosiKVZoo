function playPause() { 
    if (myVideo.paused) {
        myVideo.play(); 
        document.getElementById('play_pause').innerHTML='pause';
        myTimerInterval=setInterval(mySeekUpdater, 1000);
    } else { 
        myVideo.pause(); 
        document.getElementById('play_pause').innerHTML='play_arrow';
        clearInterval(myTimerInterval);
    }
} 

function playSeek() {
    var videoLength;
    var seekValue;
    videoLength= myVideo.duration;
    seekValue = event.target.value;
    myVideo.currentTime=videoLength*seekValue/100;
}

function playVolume(){
    if (myVideo.volume>0) { 
        myVideo.volume=0;
        document.getElementById('play_volume').innerHTML='volume_up';
    } else {
        myVideo.volume=1;
        document.getElementById('play_volume').innerHTML='volume_off';        
    }

}

function mySeekUpdater (){
    var videoLength;
    var seekValue;
    videoLength= myVideo.duration;
    seekValue = document.getElementById('play_seek');
    if (myVideo.currentTime==videoLength) {
        clearInterval(myTimerInterval);
    } else {
        seekValue.value=Math.round(myVideo.currentTime/videoLength*100);
    }

}