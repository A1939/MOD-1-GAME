class TurboGauge {
    constructor(ctx, side) {
        this.side = side;
        
        this.sprite = new Image();
        this.sprite.src = "/assets/img/Fuell.png";
        this.sprite.verticalFrames = 6;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = 135;
            this.sprite.frameHeight = 44;
        }

        this.ctx = ctx;
    }

    displayFuel(fuelAmount) {
        this.sprite.verticalFrameIndex = fuelAmount;
    }

    draw(fuelAmount) {
        this.displayFuel(fuelAmount);
        
        if (this.sprite.isReady) {
            if (this.side === "left") {
                this.ctx.drawImage(
                    this.sprite,
                    this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                    this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                    this.sprite.frameWidth,
                    this.sprite.frameHeight,
                    45,
                    750 - (44 + 45),
                    135,
                    44
                )
            }
            if (this.side === "right") {
                this.ctx.drawImage(
                    this.sprite,
                    1 * this.sprite.frameWidth,
                    this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                    this.sprite.frameWidth,
                    this.sprite.frameHeight,
                    1500 - (135 + 45 + 15),
                    750 - (44 + 45),
                    135,
                    44
                )
            }
        }
    }
}