
let grid = null;


class SimItem {
    constructor() {
    }

    simUpdate(x, y) {
    }
    drawUpdate(ctx, x, y) {
    }
}

class Grid {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.data = [];

        for (let i = 0; i < height * width; i++) {
            this.data[this.data.length] = null;
        }
    }


    getI(x, y) {
        return (this.width * y) + x;
    }

    getC(i) {
        return [i % height, Math.floor(i / height)];
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

    update() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] instanceof SimItem) {
                let coords = this.getC(i);
                this.data[i].simUpdate(cords[0], coords[1]);
            }
        }
    }

    draw(canv, ctx, widthpx, heightpx)  {
        console.log(ctx);
        

        // TODO
        const tileHeight = heightpx / this.height, tileWidth = widthpx / this.width;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                //ctx.fillStyle = randomColor();
                ctx.fillStyle = '#0000BB';
                ctx.beginPath();
                ctx.fillRect(x, y, 1, 1);
                
            }
        }
        // Draw Grid depending on size
        // Pass Drawing data (context, width, height)
        


        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] instanceof SimItem) {
                let coords = this.getC(i);
                //this.data[i].drawUpdate(ctx, coords[0], coords[1]);
            }
        }
        const   scaleX = widthpx / this.width,
                scaleY = heightpx / this.height;
        //canv.style.transformOrigin = '0 0';
        //canv.style.transform = 'scale(' + Math.min(scaleX, scaleY) + ')';
        //canv.style.imageRendering = 'pixelated';
    }

}

function initGrid(canv, height, width) {
    grid = new Grid(height, width);

}
