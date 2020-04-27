function sqr(n1) {
    return n1 * n1;
}

function vec2Len(x, y) {
    return Math.sqrt(sqr(x) + sqr(y));
}

function dist(b1, b2) {
    return Math.sqrt(sqr(b2.x - b1.x) + sqr(b2.y - b1.y));
}

function addDelta(d, amount) {
    return d < 0 ? d - amount : d + amount;
}