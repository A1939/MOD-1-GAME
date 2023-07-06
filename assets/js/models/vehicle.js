class Vehicle {
    constructor(ctx, x, y, color = "white", orientation) {
        this.x = x;
        this.y = y;
        this.whidth = 25;
        this.height = 25;
        this.color = color;

        this.trail = [];
        this.turbo = false;
        this.orientation = orientation;
        this.lastOrientantion = orientation;
        this.victories = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/BaseSpaceShip.png";
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = 25;
            this.sprite.frameHeight = 25;
        }

        this.ctx = ctx;
    }
    
    useTurbo() {
        if (!this.turbo) {
            this.turbo = true;
            setTimeout(() => {
                this.turbo = false;
            }, 500)
        }
    }

    colidesWith(vehicle) {
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
    
        this.trail.forEach(tile => {
            tile.draw();
        })
        
        this.ctx.restore();

        if (this.sprite.isReady) {
            this.orientateSprite()
            
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x - 5,
                this.y - 5,
                this.whidth,
                this.height
            )
        }
    }
    
    orientateSprite() {
        switch (this.orientation) {
            case "up":
                this.sprite.horizontalFrameIndex = 0;
                break;
            case "down":
                this.sprite.horizontalFrameIndex = 1;
                break;
            case "right":
                this.sprite.horizontalFrameIndex = 2;
                break;
            case "left":
                this.sprite.horizontalFrameIndex = 3;
                break;
        }
    }
        
    move() {
        switch(this.orientation) {
            case "up":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.y -= VEHICLE_SPEED;
                break;
            case "down":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.y += VEHICLE_SPEED;
                break;
            case "right":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.x += VEHICLE_SPEED;
                break;
            case "left":
                this.trail.push(new Tile(this.ctx, this.x, this.y, this.orientation));
                this.x -= VEHICLE_SPEED;
                break;
        }
    
        this.lastOrientantion = this.orientation
    }
}