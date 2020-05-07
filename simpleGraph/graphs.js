
class Graph {
    INNER_OFFSET = 20;
    CANVAS_LINES = '#333333';

    graphs = [];

    addDataGraph(dat, gColor) {
        let minmax = getMinMax(dat);

        this.graphs[this.graphs.length] = {
            min: minmax[0],
            max: minmax[1],
            data: dat,
            color: gColor
        }
        return this.data.length-1;
    }

    getMinMax(dat) {
        let cMax = data[0], cMin = data[0];

        if (dat.length == 0) {
            cMin = 0;
            cMax = 0;
            return;
        }

        for (let cI = 0; cI < data.length; cI++) {
            if (data[cI] < cMin) cMin = data[cI];
            if (data[cI] > cMax) cmax = data[cI];
        }
        return [cMin, cMax];
    }
    
    appendData(newDat, graphI) {
        if (graphI >= this.graphs.length) return undefined;
        
        if (this.graphs[graphI].data.length == 0) {
            this.graphs[graphI].min = newDat;
            this.graphs[graphI].max = newDat;
        } else {
            if (newDat < this.graphs[graphI].min) this.graphs[graphI].min = newDat;
            if (newDat > this.graphs[graphI].max) this.graphs[graphI].max = newDat;
        }
        
        this.graphs[graphI].data[this.graphs[graphI].data.length] = newDat;
    }

    draw(ctx, pxWidth, pxHeight) {
        console.log('Got Here! ', pxWidth, pxHeight, ctx);

        ctx.strokeStyle = this.CANVAS_LINES;
        const inn = this.INNER_OFFSET;
        // draw bounding box
        ctx.beginPath();
        ctx.strokeRect(inn, inn, pxWidth - inn - inn, pxHeight - inn - inn);


    }
}
