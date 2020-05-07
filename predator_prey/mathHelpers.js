function randomColor() {
    //console.log('#' + Math.floor(Math.random() * 0xFFFFFF).toString(16));
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


function sqr(n1) {
    return n1 * n1;
}

function vec2Len(x, y) {
    return Math.sqrt(sqr(x) + sqr(y));
}

function distR(x1, y1, x2, y2) {
    return Math.sqrt(sqr(x2 - x1) + sqr(y2 - y1));
}

function dist(b1, b2) {
    return distR(b1.x, b1.y, b2.x, b2.y);
}

function addDelta(d, amount) {
    return d < 0 ? d - amount : d + amount;
}
