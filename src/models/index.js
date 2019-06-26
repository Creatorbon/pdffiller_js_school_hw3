function Gamer(name, score) {
    this.name = name;
    this.score = score || 0;
}

Gamer.prototype.getScore = function () {
    return this.score
}
Gamer.prototype.setScore = function () {
    return this.score++
}
Gamer.prototype.resetScore = function () {
    return this.score = 0
}

export default Gamer;