song = "";
lwrx = 0;
rwrx = 0;
lwry = 0;
rwry = 0;

function preload(){
    song =loadSound("music.mp3");
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
    }

}