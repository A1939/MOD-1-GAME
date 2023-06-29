class Tile {
    constructor(ctx, x, y, orientation) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 5;

        this.orientation = orientation
        this.ctx = ctx;
    }

    draw() {
        switch (this.orientation) {
            case "right":
                this.ctx.fillRect(this.x + 5, this.y + 5, this.width, this.height)
                break;
            case "left":
                this.ctx.fillRect(this.x - 5, this.y + 5, this.width, this.height)
                break;
            case "up":
                this.ctx.fillRect(this.x + 5, this.y - 5, this.height, this.width)
                break;
            case "down":
                this.ctx.fillRect(this.x + 5, this.y + 5, this.height, this.width)
                break;
        }
        
    }
}