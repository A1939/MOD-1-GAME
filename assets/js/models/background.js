class Background {
    constructor(ctx) {
        this.x = 0;
        this.y = 0;
        this.w = 1500;
        this.h = 750;
        this.color = "grey";
        
        this.ctx = ctx;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.restore();
    }
}