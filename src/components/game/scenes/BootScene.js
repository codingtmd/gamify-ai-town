import { Scene } from 'phaser';

// Map files
const townMap = '/assets/sprites/maps/tilesets/town.json';

// Characters files
const heroJson = '/assets/sprites/atlas/hero.json';
const slimeJson = '/assets/sprites/atlas/slime.json';
const heartJson = '/assets/sprites/atlas/heart.json';
const coinJson = '/assets/sprites/atlas/coin.json';

// NPC jsons
const npc01Json = '/assets/sprites/atlas/npc_01.json';
const npc02Json = '/assets/sprites/atlas/npc_02.json';
const npc03Json = '/assets/sprites/atlas/npc_03.json';
const npc04Json = '/assets/sprites/atlas/npc_04.json';
const npc05Json = '/assets/sprites/atlas/npc_05.json';
const npc06Json = '/assets/sprites/atlas/npc_06.json';


// Images
const heroImage = '/assets/sprites/atlas/hero.png';
const slimeImage = '/assets/sprites/atlas/slime.png';
const heartImage = '/assets/sprites/atlas/heart.png';
const coinImage = '/assets/sprites/atlas/coin.png';
const mainMenuBackgroundImage = '/assets/images/main_menu_background.png';
const gameOverBackgroundImage = '/assets/images/game_over_background.png';
const gameLogoImage = '/assets/images/game_logo.png';
const heartContainerImage = '/assets/images/heart_container.png';
const swordImage = '/assets/images/sword.png';
const pushImage = '/assets/images/push.png';
const townImage = '../assets/sprites/maps/tilesets/town.png';

// NPC images
const npc01Image = '/assets/sprites/atlas/npc_01.png';
const npc02Image = '/assets/sprites/atlas/npc_02.png';
const npc03Image = '/assets/sprites/atlas/npc_03.png';
const npc04Image = '/assets/sprites/atlas/npc_04.png';
const npc05Image = '/assets/sprites/atlas/npc_05.png';
const npc06Image = '/assets/sprites/atlas/npc_06.png';


export default class BootScene extends Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        const fontSize = 16;

        // setup loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        const { width: gameWidth, height: gameHeight } = this.cameras.main;

        const barPositionX = Math.ceil((gameWidth - (gameWidth * 0.7)) / 2);
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            barPositionX,
            Math.ceil(gameHeight / 6),
            Math.ceil(gameWidth * 0.7),
            Math.ceil(gameHeight / 10)
        );

        const loadingText = this.add.text(
            gameWidth / 2,
            Math.ceil(gameHeight / 10),
            'loading...',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize}px`,
                size: `${fontSize}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        loadingText.setOrigin(0.5);
        loadingText.setResolution(30);

        const percentText = this.add.text(
            gameWidth / 2,
            Math.ceil((gameHeight / 6) + (fontSize / 2) + (gameHeight / 60)),
            '0%',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize}px`,
                size: `${fontSize}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        percentText.setOrigin(0.5);
        percentText.setResolution(30);

        const assetText = this.add.text(
            gameWidth / 2,
            Math.ceil(gameHeight / 3),
            '',
            {
                fontFamily: '"Press Start 2P"',
                fontSize: `${fontSize / 2}px`,
                size: `${fontSize / 2}px`,
                fill: '#ffffff',
                color: '#ffffff',
            }
        );

        assetText.setOrigin(0.5);
        assetText.setResolution(30);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xFFFFFF, 1);
            progressBar.fillRect(
                barPositionX,
                Math.ceil(gameHeight / 6),
                Math.ceil(gameWidth * 0.7) * value,
                Math.ceil(gameHeight / 10)
            );
            percentText.setText(`${Number.parseInt(value * 100, 10)}%`);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText(`loading: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // Maps
        this.load.tilemapTiledJSON('town',townMap);

        // Atlas
        this.load.atlas('hero', heroImage, heroJson);
        this.load.atlas('slime', slimeImage, slimeJson);
        this.load.atlas('heart', heartImage, heartJson);
        this.load.atlas('coin', coinImage, coinJson);

        // NPCs
        this.load.atlas('npc_01', npc01Image, npc01Json);
        this.load.atlas('npc_02', npc02Image, npc02Json);
        this.load.atlas('npc_03', npc03Image, npc03Json);
        this.load.atlas('npc_04', npc04Image, npc04Json);
        this.load.atlas('npc_05', npc05Image, npc05Json);
        this.load.atlas('npc_06', npc06Image, npc06Json);

        // Tilesets
        this.load.image('town',townImage);

        // Images
        this.load.image('main_menu_background', mainMenuBackgroundImage);
        this.load.image('game_over_background', gameOverBackgroundImage);
        this.load.image('game_logo', gameLogoImage);
        this.load.image('heart_container', heartContainerImage);
        this.load.image('sword', swordImage);
        this.load.image('push', pushImage);
    }

    create() {
        this.scene.start('GameScene', {
            heroStatus: {
                position: { x: 10, y: 10 },
                previousPosition: { x: 10, y: 10 },
                frame: 'hero_idle_down_01',
                facingDirection: 'down',
                health: 60,
                maxHealth: 60,
                coin: 0,
                canPush: false,
                haveSword: false,
            },
            mapKey: 'town',
        })
    }
}
