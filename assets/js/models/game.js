class Game {
    
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.background = new Background(this.ctx)
        
        this.p1 = new Cpu(this.ctx, Math.floor(Math.random() * 50) * 15, Math.floor(Math.random() * 49) * 15, null, "right", "left");
        this.p2 = new Cpu(this.ctx, (50 + Math.floor(Math.random() * 49)) * 15, Math.floor(Math.random() * 49) * 15, null, "left", "right");
        
        this.drawIntervalId = null;

        this.audio = new Audio("/assets/audio/Wound of The Cosmos [8-bit Music to Escape A Space Station to].mp3");
        this.audio.volume = 0.05;

        this.tick = 0;
    }

    onKeyDown(event) {
        if (this.p1.player) {
            this.p1.onKeyDown(event);
        }
        if (this.p2.player) {
            this.p2.onKeyDown(event);
        }
    }
    
    start() {
        if (!this.drawIntervalId) {
            this.audio.play();
            this.drawIntervalId = setInterval(() => {
                
                this.clear();
                this.draw();
                this.move();
                this.checkCollisions();
                this.checkWin();

                if (this.tick > 90) {
                    this.tick = 0;
                    this.p1.adquireFuell();
                    this.p2.adquireFuell();
                }
                this.tick++;
            }, 1000 / 30)
        }
    }

    checkWin() {
        switch (3) {
            case this.p1.victories:
                scoreBoard.innerHTML = `P1 WINS`
                this.stop();
            case this.p2.victories:
                scoreBoard.innerHTML = `P2 WINS`
                this.stop();
        }
    }

    lowReset() {
        const p1 = this.p1, p2 = this.p2;

        p1.x = Math.floor(Math.random() * 50) * 15
        p1.y = Math.floor(Math.random() * 49) * 15;
        p1.trail.length = 0;
        p1.orientation = "right"
        p1.turbo = false;
        p1.fuel = 2;

        p2.x = (50 + Math.floor(Math.random() * 50)) * 15 - 15
        p2.y = Math.floor(Math.random() * 49) * 15;
        p2.trail.length = 0;
        p2.orientation = "left";
        p2.turbo = false;
        p2.fuel = 2;

        this.tick = 0
    }

    checkCollisions() {
        const p1 = this.p1, p2 = this.p2;
        
        switch (true) {
            case p1.colidesWith(p2) && p2.colidesWith(p1):
                this.lowReset();
                break;
            case p1.colidesWith(p2):
                this.lowReset();
                p2.victories++;
                break;
            case p2.colidesWith(p1):
                this.lowReset();
                p1.victories++;
                break;
        }

        scoreBoard.innerHTML = `${p1.victories} - ${p2.victories}`
    }

    stop() {
        clearInterval(this.drawIntervalId);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    move() {
        
        if (this.tick % 3 === 0 || this.p1.turbo) {
            if (!this.p1.player) {
                this.p1.behave(this.p2);
            }
            this.p1.move();
        }
        
        if (this.tick % 3 === 0 || this.p2.turbo) {
            if (!this.p2.player) {
                this.p2.behave(this.p1);
            }
            this.p2.move();
        }
    }
    
    draw() {
        this.background.draw();
        this.p1.draw();
        this.p2.draw();
        this.p1.drawFuel();
        this.p2.drawFuel();
    }
}