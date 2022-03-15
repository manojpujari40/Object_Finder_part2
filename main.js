objects = [];
status = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(440,280);
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function modelLoaded(){
    console.log("model Loaded");
    status = true;
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status") = "Status : Detecting";
    object_name = document.getElementById("names_of_object").value;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for (i=0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : deteced";
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%" + object[i].width, object[i].height);

            if(object[i].label == object_name){
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("status").innerHTML = object_name + "Found";
            }
            else{
                document.getElementById("status").innerHTML = "Not Found";
            }
        }
    }
}