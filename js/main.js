// Next thing to do:
// 1. start adding the metrics and get the results to show
// 2.fix the Bugs 
// -keep mousedown and move out the canvas and come back will automatically stays in mousedown.
// 3. find ways to improve the drawing experience.



const canvas = document.getElementById("spiralCanvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById('clearButton');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let startx;
let starty;
let drawed = false;

function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}



clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})

canvas.addEventListener('mousedown', (e)=>{
    drawed = true;
    const coordinates = getMousePosition(e);
    startx = coordinates.x;
    starty = coordinates.y;
    ctx.beginPath();
    ctx.moveTo(startx,starty);
});

canvas.addEventListener('mousemove', (e)=>{
    if (!drawed){
        return;
    }
    const coordinates = getMousePosition(e);
    ctx.lineWidth = .5;
    ctx.strokeStyle = '#000';
    ctx.lineCap = 'round';
    ctx.lineTo(coordinates.x, coordinates.y);
    ctx.stroke();
})

canvas.addEventListener('mouseup', (e)=>{
    drawed = false;
    ctx.beginPath();
})
