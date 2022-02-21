song = "";
song2 = "";
lwrx = 0;
rwrx = 0;
lwry = 0;
rwry = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song =loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}



function setup(){
    canvas =    createCanvas(550,550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function draw(){
    image(video,0,0,550,550);
    song1_status = song.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){
        circle(rwrx,rwry,20);  
        song2.stop()
        if(song1_status == false){
            song.play()
            document.getElementById("song").innerHTML = "Playing first song"
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(lwrx,lwry,20);
        song.stop();
        if(song2_status == false){
            song2.Play()
            document.getElementById("song").innerHTML = "Playing peter pan song"
            
        }    
    }
   
}


function Play(){
    song.play()
    song.setVolume(1);
    song.rate(1);

}

function modelLoaded(){
    console.log("MODEL LOADED!")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lwrx = results[0].pose.leftWrist.x ;
        rwrx = results[0].pose.rightWrist.x ;
        lwry = results[0].pose.leftWrist.y ;
        rwry = results[0].pose.rightWrist.y ;
        console.log("The left wrist x:"+lwrx+"The left wrist y:"+lwry);
        console.log("The right wrist x:"+rwrx+"The right wrist y:"+rwry);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist score:"+scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The Right wrist score:"+scoreRightWrist);
    }

}