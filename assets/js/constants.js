const KEY_UP_P1 = 87;
const KEY_DOWN_P1 = 83;
const KEY_RIGHT_P1 = 68;
const KEY_LEFT_P1 = 65;
const KEY_TURBO_P1 = 32;

const KEY_UP_P2 = 38;
const KEY_DOWN_P2 = 40;
const KEY_RIGHT_P2 = 39;
const KEY_LEFT_P2 = 37;
const KEY_TURBO_P2 = 45;

const VEHICLE_SPEED = 15;

// VEHICLE feat/fix: need to add method validateOrientationChange() to check if a given orientation isn't the contrary of the current one. Then make the code cleaner with it.
// CPU fix: if the furthest distance to target can't be followed, try the other befor activating avoidObstacle().
// Players onKeyDown() fix: don't let the orientation be changed to the contrary of the lastOrientation, so you can't crash into your own trail by presing the keys too fast.