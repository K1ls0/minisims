var running = true;
const updateInterval = 1000/60;
function tRun() {
    running = !running;
}

const FIELD_ID = 'field';
const GRAPH_ID = 'graph';

const PREDATOR_COLOR = '#CC0033';
const PREY_COLOR = '#00CC00';

const gridWRatio = 1/2;
let fullWidth = 200;

// Graphs-specific
let graph = null;
predatorGraph = -1;
preyGraph = -1;


// Field specific
let fieldWidth = 100;
let grid = null;



// Sim parameters
gridPixels = 30;

function init() {
    // Setup Graph
    graph = new Graph();
    predatorGraph = graph.addDataGraph([], PREDATOR_COLOR);
    preyGraph = graph.addDataGraph([], PREY_COLOR);

    // setup Grid
    grid = new Grid(gridPixels, gridPixels);
}


function resizeHandler() {
    if (    ((window.innerWidth * (1 - gridWRatio)) - 5) < 100 ||
            window.innerHeight < (window.innerWidth * gridWRatio) + 5) {
        return;
    }
    
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;

    // TODO move this functionality into Classes and call "onResize()"
    
    const field = document.getElementById(FIELD_ID);
    if (field != 'undefined' && field != null) {
        fieldWidth = fullWidth * gridWRatio;

        if (grid != null) {
            field.width = grid.width;
            field.height = grid.height;
            grid.onResize(field, fieldWidth, fieldWidth);
        }
    }

    const graph = document.getElementById(GRAPH_ID);
    if (graph != 'undefined' && graph != null) {
        const gridH = fullWidth * gridWRatio;
        const w = (fullWidth - fieldWidth) - 5;

        graph.width = w;
        graph.height = gridH;
    }
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
        grid.draw(gridCanv, gridCtx, fieldWidth, fieldWidth);

        old = now;
    }

    window.requestAnimationFrame(animLoop);
}



window.onload = () => {
    //window.addEventListener('resize', resizeCanvas, false);
    //resizeCanvas();
    window.addEventListener('resize', resizeHandler, false);
    init();

    resizeHandler();
    window.requestAnimationFrame(animLoop);
};
