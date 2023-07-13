;wristLeftX=0;
wristLeftY=0;
wristRightX=0;
wristRightY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function setup() 
{
    canvas=createCanvas(600,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log("El modelo se ha cargado");
}

function draw()
{
    image(video,0,0,600,600);

    if(scoreRightWrist>0.2)
    {
	    image(rightwrist, wristRightX, wristRightY, 100, 100);
	    if(wristRightY>0 && wristRightY<=100)
	    {
		    document.getElementById("speed").innerHTML="velocidad= 0.5x";
		    song.rate(0.5);
	    }else if(wristRightY>100 && wristRightY<=200)
	    {
		    document.getElementById("speed").innerHTML= "velocidad= 1x";
		    song.rate(1);
	    }else if(wristRightY>200 && wristRightY<=300)
	    {
	        document.getElementById("speed").innerHTML = "velocidad= 1.5x";
	        song.rate(1.5);
	    }else if(wristRightY>300 && wristRightY<=400)
	    {
	        document.getElementById("speed").innerHTML = "velocidad 2x";
	        song.rate(2);
	    }else if(wristRightY>400)w
	    {
            document.getElementById("speed").innerHTML = "velocidad 2.5x";
	        song.rate(2.5);
	    }
    }


    if(scoreLeftWrist>0.2)
    {
        image(leftwrist, wristLeftX, wristLeftY, 200,200);
        InNumberLeftWristY = Number(wristLeftY);
        new_leftWristY=floor(InNumberleftWristY*2);
        leftWristY_divide_1000=new_leftWristY/1000; 
        document.getElementById("volume").innerHTML="Volumen= " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
}

song="";

function preload()
{
    song=loadSound("meow.mp3");
    leftwrist= loadImage("miau.png");
    rightwrist= loadImage("miau.png");
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        wristLeftX=results[0].pose.leftWrist.x;
        wristLeftY=results[0].pose.leftWrist.Y;
        console.log("left wrist X= " + wristLeftX + "Left wrist Y= " + wristLeftY);
        wristRightX=results[0].pose.rightWrist.x;
        wristRightY=results[0].pose.rightWrist.y;
        console.log("Right wrist X= " + wristRightX + "Right wrist Y= " + wristRightY);

        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRight = " + scoreRightWrist + ";" + "scoreLeft = " + scoreLeftWrist);

    }
}
