var running = true;
function tRun() {
    running = !running;
}

let grid = new Grid(10, 10);


function initSim() {

}


function resizeCanvas() {
    const canv = document.getElementById('sim1');
    width = window.innerWidth;
    height = window.innerHeight;

    canv.width = width;
    canv.height = height;
}

function updateSim() {

}

function draw(ctx) {
    let cElem = elems[0];
    for (let cElem of elems) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(cElem.x, cElem.y, r, r, 0, 0, 360);
        ctx.fill();
    }
}


function animLoop() {
    if (running) {
        const ctx = document.getElementById("sim1").getContext("2d");

        //console.log(elems[0]);
        //console.log('height: ' + height + ' width: ' + width);
        //console.log()
        updateSim();
        ctx.clearRect(0, 0, width, height);
        draw(ctx);

    }

    window.requestAnimationFrame(animLoop);
}

window.onload = () => {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    initSim();

    window.requestAnimationFrame(animLoop);
};
