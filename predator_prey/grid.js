
const backgroundColor = '#333366';

class SimData {
    constructor(gridRef, x, y) {
        this.grid = gridRef;

        this.x = x;
        this.y = y;
    }
}

class SimItem {
    constructor() {
    }

    simUpdate(simDat) {
    }

    getPxColor() {
        return backgroundColor;
    }
}

class Grid {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.data = [];
        this.scheduledMoves = [];

        for (let i = 0; i < height * width; i++) {
            this.data[this.data.length] = null;
        }
    }
    
    isValidC(x, y) {
        return !(
                (x < 0 || x >= this.width) ||
                (y < 0 || y >= this.height));
    }

    getI(x, y) {
        return (this.width * y) + x;
    }
    getC(i) {
        return [i % this.height, Math.floor(i / this.height)];
    }


    setByI(i, obj) {
        if (i >= this.data.length || i < 0) {
            return false;
        }
        this.data[i] = obj;

        return true;
    }
    setByC(x, y, obj) {
        return this.setByI(this.getI(x, y), obj);
    }


    getByI(i) {
        if (i >= this.data.length) {
            return null;
        }
        return this.data[i];
    }
    getByC(x, y) {
        return this.getByI(this.getI(x, y));
    }



    resetField() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = null;
        }
    }

    move(srcX, srcY, targetX, targetY) {
        if (this.isValidC(srcX, srcY) && this.isValidC(targetX, targetY)) {
            this.scheduledMoves[this.scheduledMoves.length] = [srcX, srcY, targetX, targetY];
        }
    }

    flushMoves() {
        for (let i = 0; i < this.scheduledMoves.length; i++) {
            const cPair = this.scheduledMoves[i];
            const   targetI = this.getI(cPair[2], cPair[3]),
                    srcI = this.getI(cPair[0], cPair[1]);
            let cObj = this.data[targetI];
            this.data[targetI] = this.data[srcI];
            this.data[srcI] = cObj;
        }
        this.scheduledMoves = [];
    }

    update() {
        let targetDat = new SimData(this, 0, 0);
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] instanceof SimItem) {
                let coords = this.getC(i);
                targetDat.x = coords[0];
                targetDat.y = coords[1];
                this.data[i].simUpdate(targetDat);
            }
        }
        //console.log('Moves after update: ', this.scheduledMoves);
        this.flushMoves();
    }

    onResize(canv, widthpx, heightpx) {
        // Container scaling for better behaving canvas
        let fieldContainer = document.getElementById('fieldContainer');
        if (fieldContainer != null) {
            fieldContainer.style.width = widthpx + 'px';
            fieldContainer.style.height = heightpx + 'px';
        }

        const   scaleX = widthpx / this.width,
                scaleY = heightpx / this.height;
        canv.style.transformOrigin = '0 0';
        canv.style.transform = 'scale(' + Math.min(scaleX, scaleY) + ')';
        canv.style.imageRendering = 'pixelated';
    }

    draw(canv, ctx, widthpx, heightpx) {
        console.log('grid: ', widthpx, heightpx);

        // TODO
        const tileHeight = heightpx / this.height, tileWidth = widthpx / this.width;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cSimElem = this.data[this.getI(x, y)];

                ctx.fillStyle = cSimElem === null ? backgroundColor : cSimElem.getPxColor();
                ctx.beginPath();
                ctx.fillRect(x, y, 1, 1);
                
            }
        }
        // Draw Grid depending on size
        // Pass Drawing data (context, width, height)
        

        /*
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] instanceof SimItem) {
                let coords = this.getC(i);
                //this.data[i].drawUpdate(ctx, coords[0], coords[1]);
            }
        }*/
    }

    
    count(t) {
        let c = 0;
        for (let cItem in this.data) {
            if (typeof(cItem) == t) {
                c++;
            }
        }
        return c;
    }
}
