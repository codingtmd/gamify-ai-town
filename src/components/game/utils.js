import { GameObjects } from 'phaser';
import { TILE_WIDTH } from '../game/constants';

export const createInteractiveGameObject = (
    scene,
    x,
    y,
    width,
    height,
    name,
    isDebug = false,
    origin = { x: 0, y: 1 }
) => {
    const customCollider = new GameObjects.Rectangle(
        scene,
        x,
        y,
        width,
        height
    ).setOrigin(origin.x, origin.y);
    customCollider.name = name;
    customCollider.isCustomCollider = true;

    if (isDebug) {
        customCollider.setFillStyle(0x741B47);
    }

    scene.physics.add.existing(customCollider);
    customCollider.body.setAllowGravity(false);
    customCollider.body.setImmovable(true);

    return customCollider;
};

export const calculateGameSize = () => {
    let width = 800;
    let height = 448; // 16 * 14 = 224
    //let width = 800 ;
    //let height = 448 ;
    const multiplier = Math.min(Math.floor(window.innerWidth / width), Math.floor(window.innerHeight / height)) || 1;
    if (multiplier > 1) {
        width += Math.floor((window.innerWidth - width * multiplier) / (TILE_WIDTH * multiplier)) * TILE_WIDTH;
        height += Math.floor((window.innerHeight - height * multiplier) / (TILE_WIDTH * multiplier)) * TILE_WIDTH;
    }
    return { width, height, multiplier };
};
