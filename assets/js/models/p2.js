class Player2 extends Vehicle {
    constructor(ctx, x, y, color, orientation, side) {
        super(ctx, x, y, color, orientation, side);
        this.player = true;
        this.sprite.src = "/assets/img/BaseSpaceShipOrange.png";
    }

    addTile() {
        this.trail.push(new OrangeTile(this.ctx, this.x, this.y, this.orientation));
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_UP_P2:
                if (this.validateOrientation("up")) {
                    this.orientation = "up";
                }
                break;
            case KEY_DOWN_P2:
                if (this.validateOrientation("down")) {
                    this.orientation = "down";
                }
                break;
            case KEY_RIGHT_P2:
                if (this.validateOrientation("right")) {
                    this.orientation = "right";
                }
                break;
            case KEY_LEFT_P2:
                if (this.validateOrientation("left")) {
                    this.orientation = "left";
                }
                break;
            case KEY_TURBO_P2:
                this.useTurbo();
                break;
        }
    }
    
}