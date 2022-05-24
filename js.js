let combinations = 8;
let total = combinations*2;

let map = document.getElementById("map");

let rowStart = '<div class="row">';
let rowEnd = '</div>'

let cardStart = '<div class="card card-down" id="c';
let cardMiddle = '" onclick="FlipCard('
let cardEnd = ');"></div>';

let showStart = '<div class="show card-down" id="s';
let showMiddle = '">';
let showEnd = '</div>';

let fieldStart = '<div class="field">';
let fieldEnd = '</div>';



let com = [
    "♥️",
    "🐒️",
    "👍️",
    "🎸️",
    "🎁️",
    "🌍️",
    "👾️",
    "🐬️"
];

let was = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
];

let tip = [
    [-1,-2],
    [-1,-2],
    [-1,-2],
    [-1,-2],
    [-1,-2],
    [-1,-2],
    [-1,-2],
    [-1,-2]
];

let row = Math.sqrt(combinations*2);

onload = Start();

function Start() {
    console.log("Generate");

    let s = "";

    for (let i = 0; i < row; i++) {
        s += rowStart;

        for (let j = 0; j < row; j++) {
            var t = getType()
            var character = com[t];
            tip [i][j] = t;

            s += fieldStart
                + cardStart + i + j 
                + cardMiddle + i +", " + j
                + cardEnd
                + showStart + i + j
                + showMiddle + character
                + showEnd
                + fieldEnd; 
            console.log(t + " ");
        }
        console.log("------------ ");
        s += rowEnd;
    }

    map.innerHTML = s;

    FunAnimation();
}

function FunAnimation(){
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            var card = document.getElementById("c"+i+j);
            var show = document.getElementById("s"+i+j);

            var time = (i + j) * 100 ;

            card.style.animationDelay = time + "ms";    
            show.style.animationDelay = time + "ms";     
        }
    }
}

var x = [0, 0];
var y = [0, 0];
var click= 0;
var type = [-1, -2];

function FlipCard(xx,yy) {

    if(click<2){
        var card = document.getElementById("c"+xx+yy);
        card.style.animationDelay = 0 + "ms"; 
        card.classList.remove("card-down");
        card.classList.add("card-up");

        x[click] = xx;
        y[click] = yy;
        click++;
    }
    if(click==2){
        if(tip[x[0]][y[0]] != tip[x[1]][y[1]]){
            console.log("nope");
            setTimeout(closeTwo, 500);

        }
        else{

            console.log("yes");

            setTimeout(findTwo, 500);
        }
    }
    console.log(tip[x[0]][y[0]] +"   " + tip[x[1]][y[1]]);
}

function closeTwo(){
    var card1 = document.getElementById("c"+x[0]+y[0]);
    var card2 = document.getElementById("c"+x[1]+y[1]); 

    card1.style.animationDelay = 0 + "ms"; 
    card2.style.animationDelay = 0 + "ms"; 

    card1.classList.add("card-down");
    card1.classList.remove("card-up");

    card2.classList.add("card-down");
    card2.classList.remove("card-up");

    click=0;
}

function findTwo(){
    var show1 = document.getElementById("s"+x[0]+y[0]);
    var show2 = document.getElementById("s"+x[1]+y[1]); 

    show1.style.animationDelay = 0 + "ms"; 
    show2.style.animationDelay = 0 + "ms"; 

    show1.classList.remove("card-down");
    show1.classList.add("card-up");

    show2.classList.remove("card-down");
    show2.classList.add("card-up");

    click=0;


    total-=2;

    if(total==0){
        setTimeout(Reset, 500);
    }
}




function Reset(){

    total=combinations*2;
    for (let i = 0; i < combinations; i++) {
        was[i]=0;      
    }

    Start();
}



/* EXTRA STUFF */

function getType(){
    var br = randomInt(combinations);
    var ok = false;

    var counter = 0;
    while(!ok){
        if(was[br]<2){
            was[br]++;
            ok = true;
        }
        else{
            if(br<combinations)
                br++;
            else
                br=0;
        }

        if(counter>10){

            console.log("SHIT");
            ok= true;
            br = -1;

            return br;
        }
        counter ++;
    }

    return br;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}