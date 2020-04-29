var running = true;

let width = 100, height = 100;
function tRun() {
    running = !running;
}

function initSim() {
    initGrid(200, 200);
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
    grid.draw(ctx, width, height);
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
