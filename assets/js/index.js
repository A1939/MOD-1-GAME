const canvasId = "main-canvas"
const canvas = document.getElementById(canvasId);

const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
});

game.start()