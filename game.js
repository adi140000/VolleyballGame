const canvas=document.querySelector(".main-canvas");
const ctx=canvas.getContext('2d');

canvas.width=600;
canvas.height=600;

const Ball={
    x:30,
    y:20

}

ctx.fillStyle="red";

const img = new Image();

img.addEventListener("load",function(){
    function drawBall(){        
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        Ball.x++;
        Ball.y++;
        ctx.beginPath();
        ctx.fillStyle=("green");
        ctx.arc(Ball.x,Ball.y,20,20,true);
        
        ctx.fill();
        ctx.closePath();    

    }
    
    setInterval(drawBall,1000);
})

img.src="beckground.jpg"



