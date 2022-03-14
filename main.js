video = "";
Status ="";
object = [];

 function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";

    video = createCapture(VIDEO);
    video.size(600,450);
    video.hide();
}

function modelLoaded(){
    console.log("modelLoaded");
    Status = true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    object = results;
}
}

function draw(){
    image(video,0,0,600,450);
    
    if(Status != ""){
        for(i = 0;i < object.length;i++){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Object Detected !";
            document.getElementById("number_of_objects").innerHTML = "objects detected : "+ object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " "+ percent +"%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
       }
    }
}

