const canvas=document.querySelector(".main-canvas");
const ctx=canvas.getContext('2d');

canvas.width=800;
canvas.height=350;
ctx.fillStyle="beige";
ctx.fillRect(0,0,800,350);
let sI=null;

//BALL

const Ball = function(ctx,size,color){
    this.size=size;
    this.positionX=(ctx.canvas.width/2);
    this.positionY=(ctx.canvas.height/2*.4);
    this.gX=5;
    this.gY=5;
    this.color=color;
    // this.move=function(){
    //     if(this.positionY-size<=0)
    //     {
    //         this.gY=-this.gY;
    //     }
    //     if(this.positionX-size<=0 || this.positionX+size>=ctx.canvas.width){
    //         this.gX=-this.gX;
    //     }
    //     this.positionX+=this.gX;
    //     this.positionY-=this.gY;
    //     if(this.positionY+size>=ctx.canvas.height)
    //     {
    //         document.querySelector("h1").innerHTML="Przegrales"
    //     }
    // }
    // this.draw=function(){
    //     ctx.beginPath();
    //     ctx.fillStyle=this.color;       
    //    ctx.arc(this.positionX,this.positionY,size,2*Math.PI,0);
    //     //ctx.fillRect(this.positionX,this.positionY,this.size,this.size);
    //     ctx.fill();
    // }
    
}

Ball.prototype.move=function(){
    if(this.positionY-this.size<=0)
    {
        this.gY=-this.gY;
    }
    if(this.positionX-this.size<=0 || this.positionX+this.size>=ctx.canvas.width){
        this.gX=-this.gX;
    }
    this.positionX+=this.gX;
    this.positionY-=this.gY;
    if(this.positionY+this.size>=ctx.canvas.height)
    {
        document.querySelector("h1").innerHTML="Przegrales"
    }
}
Ball.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle=this.color;       
   ctx.arc(this.positionX,this.positionY,this.size,0,2*Math.PI);
    //ctx.fillRect(this.positionX,this.positionY,this.size,this.size);
    ctx.fill();
    
}


/// NET
const Net=function(ctx){
    this.height=(ctx.canvas.height/3*2);;
    this.width=6;
    this.positionX=(ctx.canvas.width/2-2);
    this.positionY=(ctx.canvas.height/3);
    

}
 
Net.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
    ctx.fill();
}


///VOLLEYBALLER
const Volleyballer = function(ctx,positionX,color,play){
    this.height= ctx.canvas.height/4;
    this.width=ctx.canvas.width/20;
    this.positionX=positionX;
    this.positionY= ctx.canvas.height;
    this.color=color;
    this.play=play;
}

Volleyballer.prototype.move=function(ball){
   
        canvas.addEventListener("mousemove",function(e){
        this.positionX=e.clientX-ctx.canvas.offsetLeft-(this.width/2);
        
        }.bind(this))
        
        if((ball.positionX>=this.positionX) && (ball.positionX<=this.positionX+this.width)&&(ball.positionY+ball.size>=this.positionY-this.height))
        {
            
            ball.gX=-ball.gX;
            ball.gY=-ball.gY;
        }
    
}
    
Volleyballer.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.fillRect(this.positionX,this.positionY-this.height,this.width,this.height);
    ctx.fill();
    ctx.closePath();
}



///VOLLEYBALLGAME
const VolleyballGame=function(ctx,ball,player,computer,net){
    this.ctx=ctx;
    this.ball=ball;
    this.player=player;
    this.computer=computer;
    this.net=net;
    
}

VolleyballGame.prototype.drawElements=function(){
    this.ball.draw(); 
    this.net.draw();
    this.player.draw();
    this.computer.draw();
}
VolleyballGame.prototype.moveElements=function(ball){
    this.player.move(this.ball);
    this.ball.move();
    this.computer.move(this.ball);
    
}

VolleyballGame.prototype.detectedHits=function(){
    if(this.player.positionX+this.player.width>=this.net.positionX)
    {
        this.player.positionX=this.net.positionX-this.player.width;
        
    }

    if(this.computer.positionX<=this.net.positionX+this.net.width)
    {
        this.computer.positionX=this.net.positionX+this.net.width;
        
    }
    

   
    
}

VolleyballGame.prototype.gameOver=function(){
    if(this.ball.positionY==ctx.canvas.height)
    {
        clearInterval(sI);
    }
}
    

if(canvas && canvas.getContext('2d'))
{
  const ball1 = new Ball(ctx,10,"blue");  
  const net = new Net(ctx);  
  const player = new Volleyballer(ctx,100,"red",true);
  const computer = new Volleyballer(ctx,700,"green",false);
  const game =new VolleyballGame(ctx,ball1,player,computer,net);
  const startGame = function()
  {
    game.detectedHits();
    ctx.fillStyle="beige";
    ctx.fillRect(0,0,800,350);
    game.drawElements();
    
   game.moveElements(ball1);
   game.gameOver();
    

  }
  
sI=setInterval(startGame,1000/60);
 
    

}




