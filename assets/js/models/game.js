class Game {
    
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.background = new Background(this.ctx)
        this.p1 = new Player1(this.ctx, 0, 375, null, "right")
        this.p2 = new Cpu(this.ctx, 1500 - 15, 375, null, "up") // new Player2
        this.drawIntervalId = null;

        this.tick = 0;
    }

    onKeyDown(event) {
        this.p1.onKeyDown(event);
        // this.p2.onKeyDown(event);
    }
    
    start() {
        if (!this.drawIntervalId) {
            
            this.drawIntervalId = setInterval(() => {
                
                this.clear();
                this.draw();
                this.move();
                this.checkCollisions();
                this.checkWin();

                if (this.tick > 12) {
                    this.tick = 0
                }
                this.tick++;
            }, 1000 / 15)
        }
    }

    checkWin() {
        switch (3) {
            case this.p1.victories:
                alert("P1 WINS")
                this.stop();
            case this.p2.victories:
                alert("P2 WINS")
                this.stop();
        }
    }

    checkCollisions() {
        const p1 = this.p1, p2 = this.p2;
        
        switch (true) {
            case p1.colidesWith(p2) && p2.colidesWith(p1):
                
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                p1.turbo = false
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";
                p2.turbo = false
                
                break;
            
            case p1.colidesWith(p2):
                
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                p1.turbo = false
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";
                p2.turbo = false
                
                p2.victories++;
                
                break;
            
            case p2.colidesWith(p1):
                console.log("o: ", p2.orientation, " x: ", p2.x, " y: ", p2.y)
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                p1.turbo = false
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";
                p2.turbo = false

                p1.victories++;
                this.stop();
                break;
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    move() {
        
        if (this.tick % 3 === 0 || this.p1.turbo) {
            this.p1.move();
        }
        
        if (this.tick % 3 === 0 || this.p2.turbo) {
            console.log(" ANTES:  "," ORIENTATION:  ", this.p2.orientation, " X: ", this.p2.x, " Y: ", this.p2.y);
            this.p2.behave(this.p1);
            console.log(" DESPUES:  "," ORIENTATION:  ", this.p2.orientation, " X: ", this.p2.x, " Y: ", this.p2.y);
            this.p2.move();
        }
    }
    
    draw() {
        this.background.draw();
        this.p1.draw();
        this.p2.draw();
    }
}