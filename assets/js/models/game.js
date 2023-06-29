class Game {
    
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.background = new Background(this.ctx)
        this.p1 = new Player1(this.ctx, 0, 375, null, "right")
        this.p2 = new Player2(this.ctx, 1500 - 15, 375, null, "left")
        this.drawIntervalId = null;

        this.tick = 0;
    }

    onKeyDown(event) {
        this.p1.onKeyDown(event);
        this.p2.onKeyDown(event);
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
                
                /*console.log(`P1 x: ${this.p1.x}, y: ${this.p1.y}, trail length: ${this.p1.trail.length}`);
                console.log(`P2 x: ${this.p2.x}, y: ${this.p2.y}, trail length: ${this.p2.trail.length}`); */
            }, 1000 / 60)
        }
    }

    checkWin() {
        switch (3) {
            case this.p1.win:
                alert("P1 WINS")
                this.stop();
            case this.p2.win:
                alert("P2 WINS")
                this.stop();
        }
    }

    checkCollisions() {
        const p1 = this.p1, p2 = this.p2;
        const trail = p1.trail.concat(p2.trail);
        
        const p2ColBorder = p2.x > this.canvas.width || p2.x < 0 || p2.y > this.canvas.height || p2.y < 0;
        const p1ColBorder = p1.x > this.canvas.width || p1.x < 0 || p1.y > this.canvas.height || p1.y < 0;
        const p1ColP2 = p1.x === p2.x && p1.y === p2.y
        let p1ColTile = null, p2ColTile = null;

        trail.forEach(tile => {
            const p1ColX = p1.x === tile.x;
            const p1ColY = p1.y === tile.y;
            const p2ColX = p2.x === tile.x;
            const p2ColY = p2.y === tile.y;

            if (p1ColX && p1ColY) {
                p1ColTile = true
            }
            if (p2ColX && p2ColY) {
                p2ColTile = true
            }
        })

        const p1Col = p1ColBorder || p1ColTile;
        const p2Col = p2ColBorder || p2ColTile;

        switch (true) {
            case p1Col && p2Col:
            case p1ColP2:
                
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";
                
                break;
            
            case p1Col:
                
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";
                
                p2.win++;

                break;
            
            case p2Col:
                
                p1.x = 0;
                p1.y = 375;
                p1.trail.length = 0;
                p1.orientation = "right"
                
                p2.x = 1500 - 15;
                p2.y = 375;
                p2.trail.length = 0;
                p2.orientation = "left";

                p1.win++;

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
            this.p2.move();
        }
    }
    
    draw() {
        this.background.draw();
        this.p1.draw();
        this.p2.draw();
    }
}