const newGame = document.querySelector("button.newGame");
const nextRound = document.querySelector("button.nextRound");

const canvas=document.querySelector(".main-canvas");
const ctx=canvas.getContext('2d');



canvas.width=window.innerWidth/1.5;
canvas.height=window.innerHeight/1.5;
ctx.fillStyle="beige";
ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
let sI=null;
let position=100;
const audio = new Audio("hit.mp3");



//BALL

const Ball = function(ctx,size,color){
    this.size=(ctx.canvas.height/1000)*size;
    this.positionX=(ctx.canvas.width/2);
    this.positionY=(ctx.canvas.height/2*.4);
    this.gX=5;
    this.gY=5;
    this.color=color;
    this.canHits=true;
   
    
}

Ball.prototype.move=function(ctx){
    if(this.positionY-this.size<=0)
    {
        this.gY=-this.gY;
        this.gY
    }
    if(this.positionX-this.size<=0 || this.positionX+this.size>=ctx.canvas.width){
        this.gX=-this.gX;
    }
    this.positionX+=this.gX;
    this.positionY-=this.gY;
    if(this.positionY<=ctx.canvas.height/2)
    {
        this.canHits=true;
        
    }
    
}

Ball.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle=this.color;       
   ctx.arc(this.positionX,this.positionY,this.size,0,2*Math.PI);
    //ctx.fillRect(this.positionX,this.positionY,this.size,this.size);
    ctx.fill();
    
}

Ball.prototype.detectedNet=function(net){
    if(this.positionX+this.size>=net.positionX && this.positionX+this.size<=net.positionX+net.width && this.positionY+this.size>=net.positionY && net.hit )
    {
        
        this.gX=-this.gX;
        net.hit=false;

    }else if(this.positionX-this.size<=net.positionX+net.width && this.positionX-this.size>=net.positionX && this.positionY+this.size>=net.positionY && net.hit)
    {
        this.gX=-this.gX;
        net.hit=false;
    }
    else{
        net.hit=true;
    }
    
}

/// NET
const Net=function(ctx){
    this.height=(ctx.canvas.height/10*5);;
    this.width=6;
    this.positionX=(ctx.canvas.width/2-2);
    this.positionY=(ctx.canvas.height/10*5);
    this.hit=true;

}
 
Net.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
    ctx.fill();
}


///VOLLEYBALLER
const Volleyballer = function(ctx,positionX,color,play){
    this.height= ctx.canvas.height/16;
    this.width=ctx.canvas.width/15;
    this.positionX=positionX;
    this.positionY= ctx.canvas.height;
    this.color=color;
    this.pkt=0;
    this.play=play;
}

Volleyballer.prototype.move=function(e){  
        
        this.positionX=e-ctx.canvas.offsetLeft-(this.width/2);            
    
}

Volleyballer.prototype.detected=function(ball)
{
    if((ball.positionX>=this.positionX) && (ball.positionX<=this.positionX+this.width)&&(ball.positionY+ball.size>=this.positionY-this.height)&& ball.canHits)
    {
        audio.play();
        if(ball.positionX>=this.positionX+this.width/2){
            ball.gX=ball.gX;
        }
        else{
            ball.gX=-ball.gX;
        }       
        ball.gY=-ball.gY;        
        console.log(ball.gY);
        ball.canHits=false;
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
VolleyballGame.prototype.moveElements=function(position,ctx){
    this.player.move(position);
    this.ball.move(ctx);
    this.computer.move(position);
    
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

    if(this.player.positionX<=0)
    {
        this.player.positionX=0;
    }

    if(this.computer.positionX+this.computer.width>= ctx.canvas.width)
    {
        
        this.computer.positionX=ctx.canvas.width-this.computer.width;
    }
    
    this.computer.detected(this.ball);
    this.player.detected(this.ball);
    this.ball.detectedNet(this.net);

    if(this.net.positionX<this.ball.positionX+this.ball.size || this.net.positionX+this.net.width>this.ball.positionX-this.ball.size)
    {
        this.net.hit=true;        
    }
   
    if(this.ball.positionY<=this.ball.size){
        if(this.ball.gY<10)
        {
          this.ball.gY+=0.3;
          this.ball.gX+=0.3;
          console.log("przyspieszylem");
        }

    }
    
    
}

VolleyballGame.prototype.gameOver=function(){
    if(this.ball.positionY+this.ball.size>=ctx.canvas.height)
    {
       
    
        if(this.ball.positionX<=this.ctx.canvas.width/2)
        {
        
            this.computer.pkt++;
            document.querySelector("div.result-computer").innerHTML=this.computer.pkt;
        }
        else
        {
            this.player.pkt++;
            document.querySelector("div.result-player").innerHTML=this.player.pkt;
        }

        clearInterval(sI);
        if(this.player.pkt==10)
        {
            document.querySelector("h1").innerHTML="Wygral zawodnik nr : 1";
        }else if(this.computer.pkt==10){
            document.querySelector("h1").innerHTML="Wygral zawodnik nr : 2";
        }else{
            nextRound.style.display="block";
        }
        
        newGame.style.display="block";
    
    }
}


const ball1 = new Ball(ctx,20,"yellow");  
const net = new Net(ctx);  
const player = new Volleyballer(ctx,200,"red",true);
const computer = new Volleyballer(ctx,700,"green",false);
const game =new VolleyballGame(ctx,ball1,player,computer,net);

const play = function(){
    if(canvas && canvas.getContext('2d'))
      {     
        ball1.positionX=(ctx.canvas.width/2);
        ball1.positionY=(ctx.canvas.height/2*.4);   
        ball1.gX=5;
        ball1.gY=5;   
        newGame.style.display="none";
        nextRound.style.display="none"; 
     
      let tmp = Math.round(Math.random());
      if(tmp)
      {
          ball1.gX=-ball1.gX;
      }
     
      canvas.addEventListener("mousemove",function(e){
        position=e.clientX;
        
      })
      const startGame = function()
      {
        game.detectedHits();
        ctx.fillStyle="beige";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        game.drawElements();    
       game.moveElements(position,ctx);
       game.gameOver();      

    
      }
      
    sI=setInterval(startGame,1000/60);   
    
    }
}


    nextRound.addEventListener("click",play);
    newGame.addEventListener("click",play);
    newGame.addEventListener("click",function(){
    
        player.pkt=0;
        computer.pkt=0
        document.querySelector("h1").innerHTML="--------"
        document.querySelector("div.result-player").innerHTML=0;
        document.querySelector("div.result-computer").innerHTML=0;
        
    });
   

 
    







