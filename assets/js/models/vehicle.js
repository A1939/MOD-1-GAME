class Vehicle {
    constructor(ctx, x, y, color = "black", orientation) {
        this.x = x;
        this.y = y;
        this.whidth = 15;
        this.height = 10;
        this.color = color;

        this.trail = [];
        this.turbo = null;
        this.orientation = orientation;
        this.victories = 0;

        this.ctx = ctx;
    }

    colidesWith (vehicle) {
        const trails = this.trail.concat(vehicle.trail)

        if (this.x === vehicle.x && this.y === vehicle.y) {
            return true;
        } else if (trails.some(tile => this.x === tile.x && this.y === tile.y)) {
            return true;
        } else if (this.x > 1500 || this.x < 0 || this.y > 750 || this.y < 0) {
            return true;
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
    
        switch (this.orientation) {
            case "right":
                this.ctx.fillRect(this.x, this.y + 2.5,this.whidth, this.height);
                break;
            case "left":
                this.ctx.fillRect(this.x, this.y + 2.5,this.whidth, this.height);
                break;
            case "up":
                this.ctx.fillRect(this.x + 2.5, this.y,this.height, this.whidth);
                break;
            case "down":
                this.ctx.fillRect(this.x + 2.5, this.y,this.height, this.whidth);
                break;
        }
    
        this.trail.forEach(tile => {
            tile.draw();
        })
    
        this.ctx.restore();
    }

    move() {
        switch(this.orientation) {
            case "right":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.x += VEHICLE_SPEED;
                break;
            case "left":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.x -= VEHICLE_SPEED;
                break;
            case "up":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.y -= VEHICLE_SPEED;
                break;
            case "down":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.y += VEHICLE_SPEED;
                break;
        }
    
    }
}