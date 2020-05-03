var running = true;

let width = 100, height = 100;
function tRun() {
    running = !running;
}

const UPDATE_T = 80;


class TestMover extends SimItem {

    constructor() {
        super();
        this.col = randomColor();
        this.vec = [1, 1];
    }

    simUpdate(simDat) {
        console.log('simDat: ', simDat);
//        console.log('mover: ', this);
        this.col = randomColor();

        let newX = simDat.x + this.vec[0],
            newY = simDat.y + this.vec[1];

        if (newX < 0 || newX >= simDat.grid.width) {
            this.vec[0] = -this.vec[0];
            newX = simDat.x + this.vec[0];
        }

        if (newY < 0 || newY >= simDat.grid.height) {
            this.vec[1] = -this.vec[1];
            newY = simDat.y + this.vec[1];
        }
        
        //console.log('x1: '+ simDat.x + ' y1: ' + simDat.y);
        //console.log('x2: ' + newX + ' y2: ' + newY);
        
        simDat.grid.move(simDat.x, simDat.y, newX, newY);
    }



    getPxColor() {
        return this.col;
    }
}



function initSim() {
    initGrid(10, 10);
    grid.setByI(Math.round(grid.data.length/2), new TestMover());
}


function resizeCanvas() {
    const canv = document.getElementById('sim1');
    width = window.innerWidth;
    height = window.innerHeight;

    canv.width = width;
    canv.height = height;
}

let counter = 0;
function updateSim() {
    if (counter % UPDATE_T === 0) {
        grid.update();

        counter = 0;
    }

    counter++;
}

function draw(canv, ctx) {
    grid.draw(canv, ctx, width, height);
}


function animLoop() {
    if (running) {
        const canv = document.getElementById("sim1");
        const ctx = canv.getContext("2d");

        //console.log(elems[0]);
        //console.log('height: ' + height + ' width: ' + width);
        //console.log()
        updateSim();
        ctx.clearRect(0, 0, width, height);
        draw(canv, ctx);

    }

    window.requestAnimationFrame(animLoop);
}

window.onload = () => {
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    initSim();

    window.requestAnimationFrame(animLoop);
};
