const canvas=document.querySelector(".main-canvas");
const ctx=canvas.getContext('2d');

canvas.width=800;
canvas.height=350;
ctx.fillStyle="beige";
ctx.fillRect(0,0,800,350);

const Ball = function(ctx,size,color){
    this.size=size;
    this.positionX=(ctx.canvas.width/2);
    this.positionY=(ctx.canvas.height/2*.4);
    this.gX=2;
    this.gY=1;
    this.color=color;
    this.move=function(){
        if(this.positionY-size<=0)
        {
            this.gY=-this.gY;
        }
        if(this.positionX-size<=0 || this.positionX+size>=ctx.canvas.width){
            this.gX=-this.gX;
        }
        this.positionX+=this.gX;
        this.positionY-=this.gY;
        if(this.positionY+size>=ctx.canvas.height)
        {
            document.querySelector("h1").innerHTML="Przegrales"
        }
    }
    this.draw=function(){
        ctx.beginPath();
        ctx.fillStyle=this.color;       
       ctx.arc(this.positionX,this.positionY,size,2*Math.PI,0);
        //ctx.fillRect(this.positionX,this.positionY,this.size,this.size);
        ctx.fill();
        
    }
}

const Net=function(ctx){
    this.height=(ctx.canvas.height/3*2);;
    this.width=6;
    this.positionX=(ctx.canvas.width/2-2);
    this.positionY=(ctx.canvas.height/3);
    this.draw=function(){
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
        ctx.fill();
    }

}
 
const Volleyballer = function(ctx,positionX,color){
    this.height= ctx.canvas.height/4;
    this.width=ctx.canvas.width/15;
    this.positionX=positionX;
    this.positionY= ctx.canvas.height;
    this.color=color;
    this.move=function(){
        canvas.addEventListener("mousemove",function(e){
            this.positionX=e.clientX-ctx.canvas.offsetLeft-(this.width/2);
            //console.log(this);
        }.bind(this))
    }
    this.draw=function(){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.positionX,this.positionY-this.height,this.width,this.height);
        ctx.fill();
        ctx.closePath();
    }
}

const VolleyballGame=function(ctx,ball,player,computer,net){
    this.ctx=ctx;
    this.ball=ball;
    this.player=player;
    this.computer=computer;
    this.net=net;
    this.drawElements=function(){
        this.ball.draw(); 
        this.net.draw();
        this.player.draw();
        this.computer.draw();
    }
    this.moveElements=function(){
        this.player.move();
        this.ball.move();
    }
}


if(canvas && canvas.getContext('2d'))
{
  const ball1 = new Ball(ctx,10,"blue");  
  const net = new Net(ctx);  
  const player = new Volleyballer(ctx,100,"red");
  const computer = new Volleyballer(ctx,700,"green");
  const game =new VolleyballGame(ctx,ball1,player,computer,net);
  const startGame = function()
  {
    ctx.fillStyle="beige";
    ctx.fillRect(0,0,800,350);
    game.drawElements();
   game.moveElements();
    

  }
  
setInterval(startGame,1000/60);
 
    

}




