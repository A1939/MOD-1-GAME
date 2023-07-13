const canvasId = "main-canvas"
const canvas = document.getElementById(canvasId);
const startButton = document.getElementById("start-button")
const playerButton = document.getElementById("player-select")
const scoreBoard = document.getElementById("scoreboard")
let players = 0;

const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
});

scoreBoard.style.display = "none";
canvas.style.display = "none";

playerButton.onclick = () => {
    if (players === 0) {
        playerButton.innerHTML = " 1 Player "
        game.p1 = new Player1(game.ctx, Math.floor(Math.random() * 50) * 15, Math.floor(Math.random() * 49) * 15, null, "right", "left");
        game.p2 = new Cpu(game.ctx, (50 + Math.floor(Math.random() * 49)) * 15, Math.floor(Math.random() * 49) * 15, null, "left", "right");
        players++;
    } else if (players === 1) {
        playerButton.innerHTML = " 2 Players "
        game.p1 = new Player1(game.ctx, Math.floor(Math.random() * 50) * 15, Math.floor(Math.random() * 49) * 15, null, "right", "left");
        game.p2 = new Player2(game.ctx, (50 + Math.floor(Math.random() * 49)) * 15, Math.floor(Math.random() * 49) * 15, null, "left", "right");
        players++;
    } else {
        playerButton.innerHTML = " 0 Players "
        game.p1 = new Cpu(game.ctx, Math.floor(Math.random() * 50) * 15, Math.floor(Math.random() * 49) * 15, null, "right", "left");
        game.p2 = new Cpu(game.ctx, (50 + Math.floor(Math.random() * 49)) * 15, Math.floor(Math.random() * 49) * 15, null, "left", "right");
        players = o;
    }
}


startButton.onclick = () => {
    playerButton.remove();
    startButton.remove();
    canvas.style.display = "block";
    scoreBoard.style.display = "block";
    game.start();
}