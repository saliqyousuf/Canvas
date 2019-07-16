var drawDiagram = {
  position : new Object(),
  canvas : new Object(),
  ctx : new Object(),
  canvasOffSet : "",
  offsetX :0,
  offsetY : 0,
  selectedTool:"",
  isDown:false,
  isErasing:false,
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
  
  //drawDiagram.ctx.drawImage(img, 0,0);
  drawDiagram.canvas.addEventListener('mousemove',draw);
  drawDiagram.canvas.addEventListener('mouseenter',setPosition);
  drawDiagram.canvas.addEventListener('mousedown',handleMouseDown);
  drawDiagram.canvas.addEventListener('mouseup',handleMouseUp);


}


function handleMouseDown(e)
{

  if(drawDiagram.selectedTool == "pencil")
  {
  drawDiagram.isErasing=false;
  setPosition(e);
  }
  else if(drawDiagram.selectedTool == "circle")
   {
    drawDiagram.position.startX = parseInt(e.clientX - drawDiagram.offsetX);
    drawDiagram.position.startY = parseInt(e.clientY - drawDiagram.offsetY);
     draw(e);
   }
 if(drawDiagram.selectedTool=="eraser")
 {
  drawDiagram.isErasing=true;
  drawDiagram.isDown = true;
 }
 if(drawDiagram.selectedTool=="arrow")
 {
  drawDiagram.isDown = true;
  drawDiagram.ctx.beginPath();
  drawDiagram.ctx.moveTo(drawDiagram.position.startX = (e.pageX - drawDiagram.canvas.offsetLeft),
  drawDiagram.position.startY = (e.pageY - drawDiagram.canvas.offsetTop));

 }

}


function handleMouseUp(e)
{
 

drawDiagram.isDown = false;

if(drawDiagram.selectedTool == "arrow")
        drawDiagram.ctx.stroke();
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

       drawDiagram.mouseX = parseInt(e.clientX - drawDiagram.offsetX);
       drawDiagram.mouseY = parseInt(e.clientY - drawDiagram.offsetY);
    
        drawCircle(e);
       break;

       case 'eraser':
         eraser(e);
         break;
       case 'arrow':
       drawDiagram.isDown=true;
        drawarrow(e);
        break;

  }
}
function drawLine(e)
{
  drawDiagram.ctx.beginPath(); // begin

  drawDiagram.ctx.lineWidth = 5;
  drawDiagram.ctx.lineCap = 'round';
  drawDiagram.ctx.strokeStyle = '#3F33FF';
 drawDiagram.ctx.globalCompositeOperation="source-over";
  drawDiagram.ctx.moveTo(drawDiagram.position.x, drawDiagram.position.y); // from
  setPosition(e);
  drawDiagram.ctx.lineTo(drawDiagram.position.x, drawDiagram.position.y); // to

  drawDiagram.ctx.stroke();

}


function drawCircle(e)
{


  drawDiagram.ctx.lineWidth = 1;
  drawDiagram.ctx.lineCap = "butt";
  drawDiagram.ctx.strokeStyle = '#3F33FF';
  drawDiagram.ctx.globalCompositeOperation="source-over";



  //drawDiagram.ctx.clearRect(drawDiagram.position.startX-1, drawDiagram.position.startY-1, drawDiagram.canvas.width, drawDiagram.canvas.height);


// drawDiagram.ctx.moveTo(drawDiagram.position.startX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
 // drawDiagram.ctx.bezierCurveTo(drawDiagram.position.startX, drawDiagram.position.startY, drawDiagram.mouseX, drawDiagram.position.startY, drawDiagram.mouseX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
 // drawDiagram.ctx.bezierCurveTo(drawDiagram.mouseX, drawDiagram.mouseY, drawDiagram.position.startX, drawDiagram.mouseY, drawDiagram.position.startX, drawDiagram.position.startY + (drawDiagram.mouseY - drawDiagram.position.startY) / 2);
  //drawDiagram.ctx.closePath();

 
  drawDiagram.ctx.beginPath();
  drawDiagram.ctx.arc(drawDiagram.mouseX, drawDiagram.mouseY, parseInt($('.jsSelectRadius').val()), 0, 2 * Math.PI);
  drawDiagram.ctx.stroke();
 
}
/* $("#myCanvas").mousedown(function() {
  isDown = true;
});

$("#myCanvas").mouseup(function() {
  isDown = false;  
}); */
function eraser(e) 
{
  if (drawDiagram.isDown && drawDiagram.isErasing) 
  {
    drawDiagram.ctx.strokeStyle = drawDiagram.ctx.strokeStyle;
    drawDiagram.ctx.lineWidth = 15;
    drawDiagram.ctx.lineCap = 'round';
    drawDiagram.ctx.beginPath();
    drawDiagram.ctx.globalCompositeOperation="destination-out";  
      drawDiagram.ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      drawDiagram.ctx.lineTo(e.pageX ,e.pageY);
      drawDiagram.ctx.stroke();     
  } 
}
function drawarrow(e)
{
  
  drawDiagram.ctx.globalCompositeOperation="source-over";
  //drawDiagram.ctx.globalCompositeOperation="source-kin"; 
  drawDiagram.ctx.strokeStyle = '#3F33FF';

  drawDiagram.ctx.lineCap = "round";
  drawDiagram.ctx.lineWidth = 1;
    var x = e.pageX - drawDiagram.canvas.offsetLeft;
    var y = e.pageY - drawDiagram.canvas.offsetTop;
    //drawDiagram.ctx.clearRect(0, 0, 300, 150);
    drawDiagram.ctx.beginPath();
    drawDiagram.ctx.moveTo(drawDiagram.position.startX, drawDiagram.position.startY);
    drawDiagram.ctx.lineTo(x, y);
    var headlen = 10; // length of head in pixels
  var dx = x - drawDiagram.position.startX;
  var dy = y - drawDiagram.position.startY;
  var angle = Math.atan2(dy, dx);
  drawDiagram.ctx.moveTo(drawDiagram.position.startX, drawDiagram.position.startY);
  drawDiagram.ctx.lineTo(x, y);
  drawDiagram.ctx.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
  drawDiagram.ctx.moveTo(x, y);
  drawDiagram.ctx.lineTo(x - headlen * Math.cos(angle + Math.PI / 6),y - headlen * Math.sin(angle + Math.PI / 6))
   // drawDiagram.ctx.closePath();

}
//var canv = document.getElementById('myCanvas2');    var ctx2 = canv.getContext('2d');   ctx2.putImageData(ctx.getImageData(0,0,canvas.width,canvas.height),0,0); 