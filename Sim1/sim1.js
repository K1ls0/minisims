var running = true;
function tRun() {
    running = !running;
}

const gravSub = (10 - 9.81);
const airMul = 0.9999;
const stoppingThreshold = 0.1;
let height = 150, width = 150;
const num = 10;

const histLen = 100;
var elems = [];


// Max init delta
const maxD = 1;
// item radius
const r = 20;
// item color
const color = '#1eb500';


function initSim() {
    for (let i = 0; i < num; i++) {
        elems[elems.length] = {
            x: Math.random() * width,
            y: Math.random() * height,
            dx: (Math.random() * maxD) - (maxD/2),
            dy: (Math.random() * maxD) - (maxD/2),
            hist: []
        };
    }
}


function resizeCanvas() {
    const canv = document.getElementById('sim1');
    width = window.innerWidth;
    height = window.innerHeight;

    canv.width = width;
    canv.height = height;
}

function addGravity(elem) {
    //elem.dx -= 0;
    elem.dy += gravSub;

    elem.dy *= airMul;
    elem.dx *= airMul;
    

    if (Math.abs(elem.dy) <= stoppingThreshold && elem.y <= (r/2)) {
        elem.dy = 0;
    }

    if (Math.abs(elem.dx) <= stoppingThreshold && elem.x <= (r/2)) {
        elem.dx = 0;
    }

}

function updateSim() {
    let cElem = elems[0];
    for (let cElem of elems) {
        cElem.hist.push((cElem.x, cElem.y));
        while (cElem.hist.length > histLen) {
            cElem.hist.shift();
        }
        addGravity(cElem);
        
        cX = cElem.x + cElem.dx;
        cY = cElem.y + cElem.dy;
        //console.log('cX: ' + cX + ' cY' + cY);
        let yDiff = (distR(0, cY, 0, height) - r),
            xDiff = distR(cX, 0, width, 0);
//        yDiff = yDiff < 0 ? 0 : yDiff;
//        xDiff = xDiff < 0 ? 0 : xDiff;
        //console.log('xDiff: ' + xDiff + ' yDiff: ' + yDiff);
        //console.log('yDiff >= height ? ' + (yDiff >= height))

        if ( yDiff <= 0 || yDiff >= height || cY < 0) {
            cElem.dy = -cElem.dy;
        }

        if ( xDiff <= 0 || xDiff >= height || cX < 0) {
            cElem.dx = -cElem.dx;
        }

        /*if (cX <= 0 || cX >= width) {
            cElem.dx = -cElem.dx;
        }
        if (cY <= 0 || cY >= height) {
            cElem.dy = -cElem.dy;
        }*/


        // Update pos
        cElem.x = cX;
        cElem.y = cY;
    }
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
