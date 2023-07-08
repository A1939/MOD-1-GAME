class Tile {
    constructor(ctx, x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation
        this.tick = 1;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/burning_loop_3_X_Y.png";
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }

        this.ctx = ctx;
    }

    parametrizeImg(a, b, c, d, e, f) {
        this.sprite.horizontalFrames = a
        this.sprite.horizontalFrameIndex = b;
        this.sprite.verticalFrames = c
        this.sprite.verticalFrameIndex = d;
        this.sprite.frameWidth = e;
        this.sprite.frameHeight = f;
        this.width = e;
        this.height = f;
    }

    assignImgParameters() {
        switch (this.orientation) {
            case "right":
                this.parametrizeImg(1, 0, 6, 0, 24, 15);
                break;
            case "left":
                this.parametrizeImg(1, 1, 6, 0, 24, 15);
                break;
            case "up":
                this.parametrizeImg(6, 0, 1, 1, 15, 24);
                break;
            case "down":
                this.parametrizeImg(6, 0, 1, 0, 15, 24);
                break;
        }
    }

    animateSprite() {
        this.assignImgParameters()
        switch (this.orientation) {
            case "up":
            case "down":
                if (this.tick % 3 === 0) {
            this.sprite.horizontalFrameIndex++;
            }
            if (this.sprite.horizontalFrameIndex > 5) {
                this.sprite.horizontalFrameIndex = 0;
            }
            break;
            case "right":
            case "left":
                if (this.tick % 3 === 0) {
            this.sprite.verticalFrameIndex++;
            }
            if (this.sprite.verticalFrameIndex > 5) {
                this.sprite.verticalFrameIndex = 0;
            }
            break;
        }
        if (this.tick > 15) {
            this.tick = 1;
        }
        this.tick++
    }

    draw() {
        if (this.sprite.isReady) {
            this.animateSprite();
            
            switch (this.orientation) {
                case "right":
                    this.ctx.drawImage(
                        this.sprite,
                        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                        this.sprite.frameWidth,
                        this.sprite.frameHeight,
                        this.x,
                        this.y,
                        this.width,
                        this.height
                    )
                    break;
                case "left":
                    this.ctx.drawImage(
                        this.sprite,
                        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                        this.sprite.frameWidth,
                        this.sprite.frameHeight,
                        this.x -10,
                        this.y,
                        this.width,
                        this.height
                    )
                    break;
                case "up":
                    this.ctx.drawImage(
                        this.sprite,
                        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                        this.sprite.verticalFrameIndex * this.sprite.frameHeight + 90,
                        this.sprite.frameWidth,
                        this.sprite.frameHeight,
                        this.x,
                        this.y - 10,
                        this.width,
                        this.height
                    )
                    break;
                case "down":
                    this.ctx.drawImage(
                        this.sprite,
                        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                        this.sprite.verticalFrameIndex * this.sprite.frameHeight + 90,
                        this.sprite.frameWidth,
                        this.sprite.frameHeight,
                        this.x,
                        this.y,
                        this.width,
                        this.height
                    )
                    break;
            }
        }
    }
}