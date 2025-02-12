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
let lastTime;
let speedData = [];
let drawed = false;

//Background spiral image
backgroundSpiral = new Image();
backgroundSpiral.src = "./Icons/spiraPic.png";
backgroundSpiral.onload = function () {
    ctx.globalAlpha = 0.1;
    ctx.drawImage(backgroundSpiral, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
};

//Drawing
function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    backgroundSpiral.onload();
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
    const x = e.offsetX;
    const y = e.offsetY;
    let lastPos = { x: 0, y: 0 }; 

    const timeNow = Date.now();
    if (lastTime !== null){
        const timeDiff = (timeNow - lastTime) /1000;
        const distance = Math.sqrt((x - lastPos.x) ** 2 + (y - lastPos.y) ** 2);
        const speed = distance / timeDiff;
        speedData.push({ x, y, speed, time:timeNow });
    }

    lastTime = timeNow;
    lastPos = { x, y };
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



document.getElementById("analyzeButton").addEventListener("click", async () => {
    try {

        const response = await axios.post("http://localhost:3000/analyze", { speedData });
        alert(response.data.message);

        localStorage.setItem("speedData", JSON.stringify(speedData));

        window.location.href = "result.html";

    } catch (error) {
        alert("Failed to connect to backend.");
        console.error("Error:", error);
    }
});
