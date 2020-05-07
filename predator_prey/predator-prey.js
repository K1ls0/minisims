var running = true;
const updateInterval = 1000/60;
function tRun() {
    running = !running;
}

const FIELD_ID = 'field';
const GRAPH_ID = 'graph';

const PREDATOR_COLOR = '#CC0033';
const PREY_COLOR = '#00CC00';

let height = 150, width = 150;

// Graphs-specific
let graph = null;
predatorGraph = -1;
preyGraph = -1;


// Field specific
let grid = null;


function init() {
    // Setup Graph
    graph = new Graph();
    predatorGraph = graph.addDataGraph([], PREDATOR_COLOR);
    preyGraph = graph.addDataGraph([], PREY_COLOR);

    // setup Grid
    grid = new Grid(height, width);
}


function resizeCanvas() {
    const canv = document.getElementById(FIELD_ID);
    width = window.innerWidth;
    height = window.innerHeight;
    
    if (canv != null) {
        canv.width = width;
        canv.height = height;
    }
}

function resizeHandler() {
    const gridCanv = document.getElementById(FIELD_ID);
    const gridBounding = gridCanv.getBoundingClientRect();
    gridCanv.width = gridBounding.width;
    gridCanv.height = gridBounding.height;

    const graphCanv = document.getElementById(GRAPH_ID);
    const graphBounding = graphCanv.getBoundingClientRect();
    graphCanv.width = graphBounding.width;
    graphCanv.height = graphBounding.height;

}

let old = 0, now = 0;
function animLoop() {
    now = Date.now();
    
    if ((now - old) >= updateInterval && running ) {
        
        grid.update();

        if (predatorGraph >= 0) {
            graph.appendData(grid.count(Predator), predatorGraph);
        }
        if (preyGraph >= 0) {
            graph.appendData(grid.count(Prey), preyGraph);
        }



        const graphCanv = document.getElementById(GRAPH_ID);
        const graphCtx = graphCanv.getContext("2d");
        graphCtx.clearRect(0, 0, graphCanv.width, graphCanv.height);
        graph.draw(graphCtx, graphCanv.width, graphCanv.height);


        const gridCanv = document.getElementById(FIELD_ID);
        const gridCtx = gridCanv.getContext("2d");
        gridCtx.clearRect(0, 0, gridCanv.width, gridCanv.height);
        grid.draw(gridCanv, gridCtx, gridCanv.width, gridCanv.height);

        old = now;
    }

    window.requestAnimationFrame(animLoop);
}


function initSim() {
    initGrid(10, 10);
    grid.setByI(Math.round(grid.data.length/2), new TestMover());
}




window.onload = () => {
    //window.addEventListener('resize', resizeCanvas, false);
    //resizeCanvas();
    window.addEventListener('resize', resizeHandler, false);
    resizeHandler();


    init();

    window.requestAnimationFrame(animLoop);
};
