Status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: identificando objetos";
    objeto = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("modelo carregado");
    Status = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(Status != ""){
        detector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detectando Objetos";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: " + objects.length;
            fill("lime");
            porcentagem = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + porcentagem + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("lime");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == objeto){
                video.stop();
                document.getElementById("status").innerHTML = "Objeto Detectado";
            }
        }
    }
}

function gotResult(error, results){
    if(error) console.error(error);
    console.log(results);
    objects = results;
}

