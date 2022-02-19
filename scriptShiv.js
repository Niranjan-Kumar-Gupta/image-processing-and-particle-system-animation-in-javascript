const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
});

let particleArray = [];

const heartX = [];
const heartY = [];


function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        let m = (16 * Math.sin(i*2) **7);
        heartX.push(m);
        let n = -(7 ** Math.cos(18*i) - 13* Math.cos(7 * i) - 2 ** Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();



const myImage = new Image()
myImage.src = 'shiv211.png'
let alpha1 =  0.4;


myImage.addEventListener('load',function(){

 

let imageWidth = myImage.width*0.5;
let imageHeight = myImage.height*0.85;
ctx.drawImage(myImage,0,0,imageWidth,imageHeight);
let data = ctx.getImageData(0,0,imageWidth,imageHeight);
ctx.clearRect(0,0,canvas.width,canvas.height);
//console.log(data)
let hue = 0;
let song = new Audio()
song.src = "https://pl3dxz-a.akamaihd.net/downloads/ringtones/files/mp3/shiv-tandav-sanskrit-wapking-cc-9934.mp3"
let animate = false;
let final = false

let heartRad = 1 

let k =0;
class ImgPoint{
    constructor(x,y,color,c1,c2,c3){
        this.x = Math.random()*canvas.width*8-canvas.width*4;
        this.y = Math.random()*canvas.height*16+canvas.height*5;
        this.xx = x + canvas.width/2 - myImage.width/2*1.5;
        this.yy = y + canvas.height/2 - myImage.height/2*1.2; 
        this.size = 1.9;        
        this.color = color;
        this.rad= 0;
        this.dir = 1;
        this.speedX = Math.random()*2+1
        this.speedY = Math.random()*5+1
        this.shadow = `rgba(${c1},${c2},${c3},0.4)`;
        this.th = 0
       
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor =  this.shadow;
        ctx.fillRect(this.x,this.y,this.size*2,this.size*2)
        ctx.closePath();
        ctx.fill(); 
    }

    update(){
     
        this.th += 5
       if (final) {
        if (this.x !== this.xx) {
            let dx = this.x - this.xx;
            this.x -= dx/20;
        }
        if (this.y !== this.yy) {
            let dy = this.y - this.yy;
            this.y -= dy/15;
        } 
 
       }
    }
    
}

setTimeout(()=>{
    final=true
},15000)



let imgPoint = [];
function init() {
   
    
    for (let y = 0 , y2=data.height; y < y2; y+=1) {
         
      for (let x = 0 , x2=data.width; x < x2; x+=1) {
          
         if (data.data[(y*4*data.width)+(x*4)+3] > 128) {
          let positionX = x;
          let positionY = y;
          let color = "rgb(" + data.data[(y*4*data.width)+(x*4)] + "," +
                               data.data[(y*4*data.width)+(x*4)+1] + "," +
                               data.data[(y*4*data.width)+(x*4)+2] + ")" ;
          imgPoint.push(new ImgPoint(positionX*3.0,positionY*1.8,color,data.data[(y*4*data.width)+(x*4)] , data.data[(y*4*data.width)+(x*4)+1], data.data[(y*4*data.width)+(x*4)+2]));
         }
          
      }       
    }
  }
  init()


  function handelImgPoint() {
       
    for (let i = 0; i < imgPoint.length; i++) {
    imgPoint[i].draw();
    imgPoint[i].update(); 
        
    }
}


class Heart{
    constructor(x,y,vel,col){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' + hue*2 + ',100%,60%)';
        this.alpha = 5;
        this.friction = 0.99;
         

    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;       
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill(); 
        ctx.closePath();
        ctx.restore();
    }
    update(){
        this.draw();
        this.alpha -= 0.05;
        this.vel.x *= this.friction; 
        this.vel.y *= this.friction; 
        this.vel.y += this.gravity; 
        this.x += this.vel.x;
        this.y -= this.vel.y;
    }

}
let hearts = [];
function initheart() {
    let heartsNum = heartX.length;
    let speed = 0.2;
    for (let i = 0; i < heartsNum; i++) {
        hearts.push(new Heart(canvas.width*0.5,canvas.height*0.27,{
            x:heartX[i]*speed,
            y:-heartY[i]*speed
        },'blue'))
    }
}

function handelheart() {
    hearts.forEach((object,index) => {
        if (object.alpha > 0) {
            object.update();  
        }else{
            hearts.splice(index,1);
       }
    });
}

let count = 0
function handelHeartInit() {
    if (count%21==0) {
        initheart() 
    }
    if (count>1000) {
        count=0
    }else{
        count++
    }
}

class Circle {
    constructor(x1, y1) {
        this.x = x1;
        this.y = y1;
        this.size = Math.random() * 1 + 0.2;
        this.t = 0;
        this.r = Math.random()*10;
        this.ang = 0;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        this.ang += 1;
        this.x += 0.2
        this.y += 0.1
        if (this.x>canvas.width) {
            this.x = 0;
        }
        if (this.y>canvas.height) {
            this.y = 0;
        }
    }
}
let cir = [];
function Cir() {
    for (let i = 0; i < 256; i++) {
        cir.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}
Cir();
function handlecircle() {
    for (let i = 0; i < cir.length; i++) {
        cir[i].draw();
        cir[i].update();
    }
}


function clear() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

setInterval(()=>{
    clear()
    handlecircle()
    handelHeartInit()
    handelheart()
    handelImgPoint()
    hue += 0.5;
    song.play()
},1000/60)
});