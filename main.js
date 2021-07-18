song_left = "";
song_right = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

score_left_wrist = 0;
score_right_wrist = 0;

function preload() {
    first = loadSound("first.mp3");
    second = loadSound("2nd.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 400);
    fill("#ff0000");
    stroke("#ff0000");

    var check1 = first.isPlaying();
    var check2 = second.isPlaying();

    if(score_left_wrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        second.stop();
        if(check1 == false){
            first.play();
            document.getElementById("song_left").innerHTML = "You are not alone song";
        }
    }

    if(score_right_wrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        first.stop();
        if(check2 == false){
            second.play();
            document.getElementById("song_left").innerHTML = "Memories song";
        }
    }

}

function modelLoaded() {
    console.log('PoseNet is initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.X;
        leftWristY = results[0].pose.Y;

        rightWristX = results[0].pose.X;
        rightWristY = results[0].pose.Y;
    }
}