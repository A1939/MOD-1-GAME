class Background {
    constructor(ctx) {
        this.x = 0;
        this.y = 0;
        this.w = 1500;
        this.h = 750;
        
        this.sprite = new Image();
        this.sprite.src = "/assets/img/Bg.png";
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
        
        this.ctx = ctx;
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
}