class Predator extends SimItem {
    tileCount = 1;

    constructor(col) {
        super();
        this.color = col;
    }

    simUpdate(simDat) {

    }

    getTileCount() {
        return this.tileCount;
    }

    getPxColor() {
        return this.color;
    }
}


class Prey extends SimItem {
    tileCount = 2;
    constructor(col) {
        super();
        this.color = col;
    }

    simUpdate(simDat) {

    }

    getTileCount() {
        return this.tileCount;
    }

    getPxColor() {
        return this.color;
    }
}