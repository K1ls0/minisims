var running = true;
function tRun() {
    running = !running;
}

const TARGET_ID = 'graph';

let height = 150, width = 150;

let graph = null;
// graph standard color
const standardColor = '#1eb500';


function init() {
    graph = new Graph([]);
}


function resizeCanvas() {
    const canv = document.getElementById(TARGET_ID);
    width = window.innerWidth;
    height = window.innerHeight;
    
    if (canv != null) {
        canv.width = width;
        canv.height = height;
    }
}


function draw(ctx) {
    graph.draw(ctx, width, height);
}


function animLoop() {
    if (running) {
        const ctx = document.getElementById(TARGET_ID).getContext("2d");
        draw(ctx);

    }

    window.requestAnimationFrame(animLoop);
}

window.onload = () => {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    init();

    window.requestAnimationFrame(animLoop);
};
