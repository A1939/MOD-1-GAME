class Cpu extends Vehicle {
    constructor (ctx, x, y, color = "white", orientation, side) {
        super (ctx, x, y, color = "white", orientation, side);
        this.obstacles = {};
        this.obstacles.target = {};
        this.player = false
    }
    
    
    /*
    
    Allways:
    Track closest obstacles in each direction and the other vehicle.
    Try to use turbo when close to the other vehicle.
    
    By Priority:
    1- Avoid inmediate collisions.
    2- Move closer to other vehicle.
    3- Move towards furthest obstacle.

    */
    
    behave(adversary) {
        this.lookAll(adversary);
        this.track();
        this.avoidObstacle();
        
        if (this.obstacles.target.x.distance < 105 && this.obstacles.target.y.distance < 105) {
            this.useTurbo();
        }
    }

    track() {
        const x = this.obstacles.target.x, y = this.obstacles.target.y;
        let notTracking;
        
        switch (true) {
            case !this.validateOrientation(y.position):
            case x.distance >= y.distance && this.validateOrientation(x.position):
                this.orientation = x.position;
                notTracking = y.position;
                break;
            case !this.validateOrientation(x.position):
            case y.distance >= x.distance && this.validateOrientation(y.position):
                this.orientation = y.position;
                notTracking = x.position;
                break;
        }
        
        if (this.avoidObstacle() && this.validateOrientation(notTracking)) {
            this.orientation = notTracking;
        }
    }

    lookUp(element) {
        return element.y < this.y;
    }

    lookDown(element) {
        return element.y >= this.y;  // ERROR WITHOUT EQUAL
    }

    lookRight(element) {
        return element.x > this.x;
    }

    lookLeft(element) {
        return element.x < this.x;
    }



    findClosestUp(elements) {
        const upElements = elements.map(element => {return element});
        const upElementsSorted = upElements.filter(element => this.lookUp(element)).filter(element => element.x === this.x).sort((a, b) => b.y - a.y);
        const closestObject = {position: "up", distance: this.y};

        if (upElementsSorted.length !== 0) {
            closestObject.distance = this.y - upElementsSorted[0].y;
        }

        return closestObject;
    }

    findClosestDown(elements) {
        const downElements = elements.map(element => {return element});
        const downElementsSorted = downElements.filter(element => this.lookDown(element)).filter(element => element.x === this.x).sort((a, b) => a.y - b.y);
        const closestObject = {position: "down", distance: 750 - this.y};

        if (downElementsSorted.length !== 0) {
            closestObject.distance = downElementsSorted[0].y - this.y;
        }

        return closestObject;
    }

    findClosestRight(elements) {
        const rightElements = elements.map(element => {return element});
        const rightElementsSorted = rightElements.filter(element => this.lookRight(element)).filter(element => element.y === this.y).sort((a, b) => a.x - b.x);
        const closestObject = {position: "right", distance: 1500 - this.x};

        if (rightElementsSorted.length !== 0) {
            closestObject.distance = rightElementsSorted[0].x - this.x;
        }

        return closestObject;
    }

    findClosestLeft(elements) {
        const leftElements = elements.map(element => {return element});
        const leftElementsSorted = leftElements.filter(element => this.lookLeft(element)).filter(element => element.y === this.y).sort((a, b) => b.x - a.x);
        const closestObject = {position: "left", distance: this.x};
        
        if (leftElementsSorted.length !== 0) {
            closestObject.distance = this.x - leftElementsSorted[0].x;
        }
        
        return closestObject;
    }



    lookAll(vehicle) {
        const objects = this.trail.concat(vehicle.trail);
        objects.push({x: vehicle.x, y: vehicle.y});
        const closestObjects = [this.findClosestUp(objects), this.findClosestDown(objects), this.findClosestRight(objects), this.findClosestLeft(objects)];
        const closestObjectsSorted = closestObjects.sort((a, b) => a.distance - b.distance);

        this.obstacles.visible = closestObjectsSorted;
        this.lookOponent(vehicle);
    }

    lookOponent(vehicle) {
        if (this.lookUp(vehicle)) {
            this.obstacles.target.y = {position: "up", distance: this.y - vehicle.y};
        }
        if (this.lookDown(vehicle)) {
            this.obstacles.target.y = {position: "down", distance: vehicle.y - this.y};
        }
        if (this.lookRight(vehicle)) {
            this.obstacles.target.x = {position: "right", distance: vehicle.x - this.x};
        }
        if (this.lookLeft(vehicle)) {
            this.obstacles.target.x = {position: "left", distance: this.x - vehicle.x};
        }
    }

    foreseeCollision() {
        const forseenCollisions = this.obstacles.visible.filter(element => element.position === this.orientation);
        
        if (forseenCollisions[0].distance <= 15) {
            return true;
        }
        return false;
    }
    
    avoidObstacle() {
        if (this.foreseeCollision()) {
            if (this.validateOrientation(this.obstacles.visible[3].position)) {
                this.orientation = this.obstacles.visible[3].position;
            } else {
                this.orientation = this.obstacles.visible[2].position;
            }
            return true;
        }
    }
}