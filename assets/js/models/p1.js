class Player1 extends Vehicle {
    constructor(ctx, x, y, color, orientation, newColor = "#0000ffbf") {
        super(ctx, x, y, color, orientation);
        this.color = newColor
    }
    
    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_UP_P1:
                if (this.orientation !== "down") {
                    this.orientation = "up";
                }
                break;
            case KEY_DOWN_P1:
                if (this.orientation !== "up") {
                    this.orientation = "down";
                }
                break;
            case KEY_RIGHT_P1:
                if (this.orientation !== "left") {
                    this.orientation = "right";
                }
                break;
            case KEY_LEFT_P1:
                if (this.orientation !== "right") {
                    this.orientation = "left";
                }
                break;
            case KEY_TURBO_P1:
                this.useTurbo();
                break;
        }
    }
}