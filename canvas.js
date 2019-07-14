var drawDiagram = {
  position : new Object(),
  canvas : new Object(),
  ctx : new Object(),
  canvasOffSet : "",
  offsetX :0,
  offsetY : 0,
  selectedTool:"",
  isDown:false,
};
 








$(document).ready(function()
{


  init();



$('.jsSelectTool').click(function()
{


  drawDiagram.selectedTool= $(this).attr('data-value');


});




});


function init()
{

  var img = document.getElementById("img");


  drawDiagram.position =  {x:0,y:0,startX:0,startY:0},
  drawDiagram.canvasOffSet = $("#myCanvas").offset();
  drawDiagram.offsetX =  drawDiagram.canvasOffSet.left;
  drawDiagram.offsetY = drawDiagram.canvasOffSet.top;
  
  
  drawDiagram.canvas = document.getElementById('myCanvas');
  drawDiagram.ctx = drawDiagram.canvas.getContext("2d");
  
 // drawDiagram.ctx.drawImage(img, 0,0);
  drawDiagram.canvas.addEventListener('mousemove',draw);
  drawDiagram.canvas.addEventListener('mouseenter',setPosition);
  drawDiagram.canvas.addEventListener('mousedown',handleMouseDown);
  drawDiagram.canvas.addEventListener('mouseup',handleMouseUp);
  drawDiagram.canvas.addEventListener('mouseout',handleMouseOut);


}



function handleMouseOut(e) {
  if (!drawDiagram.isDown) {
      return;
  }
  e.preventDefault();
  e.stopPropagation();
  drawDiagram.isDown = false;
}


function handleMouseDown(e)
{

  if(drawDiagram.selectedTool == "pencil")
  setPosition(e);



  else if(drawDiagram.selectedTool == "circle")
   {

    e.preventDefault();
    e.stopPropagation();
    drawDiagram.position.startX = parseInt(e.clientX - drawDiagram.offsetX);
    drawDiagram.position.startY = parseInt(e.clientY - drawDiagram.offsetY);
   drawDiagram.isDown = true;

   }
 


}


function handleMouseUp(e)
{
  if (!drawDiagram.isDown) {
    return;
}
e.preventDefault();
e.stopPropagation();


drawDiagram.isDown = false; 

}


function setPosition (e)
{

 
  drawDiagram.position.x = e.clientX;
  drawDiagram.position.y = e.clientY;
  drawDiagram.position.startX = parseInt(e.clientX - drawDiagram.offsetX);
  drawDiagram.position.startY = parseInt(e.clientY - drawDiagram.offsetY);


}


function draw(e)
{
  if(e.buttons !== 1)
  return;


  switch(drawDiagram.selectedTool.toLowerCase())
  {
      case 'pencil':
        drawLine(e);
       break;

       case 'circle':


      if (! drawDiagram.isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
       drawDiagram.mouseX = parseInt(e.clientX - drawDiagram.offsetX);
       drawDiagram.mouseY = parseInt(e.clientY - drawDiagram.offsetY);
    
        drawCircle(e);
       break;


  }

  

}


function drawLine(e)
{

  
  
  

  drawDiagram.ctx.beginPath(); // begin

  drawDiagram.ctx.lineWidth = 5;
  drawDiagram.ctx.lineCap = 'round';
  drawDiagram.ctx.strokeStyle = '#00000';

  drawDiagram.ctx.moveTo(drawDiagram.position.x, drawDiagram.position.y); // from
  setPosition(e);
  drawDiagram.ctx.lineTo(drawDiagram.position.x, drawDiagram.position.y); // to

  drawDiagram.ctx.stroke();



}


function drawCircle(e)
{


  drawDiagram.ctx.lineWidth = 1;
  drawDiagram.ctx.lineCap = "butt";
  drawDiagram.ctx.strokeStyle = '#00000';




drawDiagram.ctx.clearRect(drawDiagram.position.startX-1,drawDiagram.position.startY-1, drawDiagram.canvas.width/5, drawDiagram.canvas.height/5);

drawDiagram.ctx.beginPath();
drawDiagram.ctx.moveTo(drawDiagram.position.startX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
 drawDiagram.ctx.bezierCurveTo(drawDiagram.position.startX, drawDiagram.position.startY, drawDiagram.mouseX, drawDiagram.position.startY, drawDiagram.mouseX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
 drawDiagram.ctx.bezierCurveTo(drawDiagram.mouseX, drawDiagram.mouseY, drawDiagram.position.startX, drawDiagram.mouseY, drawDiagram.position.startX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
  drawDiagram.ctx.closePath();
  drawDiagram.ctx.stroke();


 // drawDiagram.ctx.stroke();
  // drawDiagram.ctx.beginPath();
  // drawDiagram.ctx.arc(drawDiagram.mouseX, drawDiagram.mouseY, 20, 0, 2 * Math.PI);
  // drawDiagram.ctx.stroke();


//  drawDiagram.ctx.beginPath();
 // drawDiagram.ctx.arc(drawDiagram.mouseX, drawDiagram.mouseY, ( (drawDiagram.mouseX-drawDiagram.position.startX) + ( drawDiagram.mouseY-drawDiagram.position.startY)) /2, 0, 2 * Math.PI);

}


//var canv = document.getElementById('myCanvas2');    var ctx2 = canv.getContext('2d');   ctx2.putImageData(ctx.getImageData(0,0,canvas.width,canvas.height),0,0); 