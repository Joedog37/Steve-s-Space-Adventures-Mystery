import AudioManager from './AudioManager.js';

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
        this.audioManager = null;
    }

    preload() {
        console.log('MainMenuScene: preload started');
        this.audioManager = new AudioManager(this);
        this.audioManager.loadAudio();
        this.load.audio('mainMenuBackgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497'); // Load main menu background music
        console.log('MainMenuScene: preload completed');
    }

    create() {
        console.log('MainMenuScene: create started');
        this.children.removeAll();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        // Check if the texture is already loaded
        if (this.textures.exists('backgroundMain')) {
            console.log('Texture backgroundMain exists');
        } else {
            console.error('Texture backgroundMain not found');
        }

        // Add background image without reloading
        const background = this.add.image(centerX, centerY, 'backgroundMain').setOrigin(0.5);
        this.audioManager.playBackgroundMusic('mainMenuBackgroundMusic', 2000); // 2-second fade-in

        this.setupMainMenu(centerX, centerY);
        console.log('MainMenuScene: create completed');
    }

    setupMainMenu(centerX, centerY) {
        const title = this.add.text(centerX, centerY - 300, "Steve's Space Adventure Mystery", {
            fontSize: '72px',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 5,
                stroke: true,
                fill: true
            },
            wordWrap: false
        }).setOrigin(0.5);

        if (title.width > this.cameras.main.width - 100) {
            title.setFontSize(64);
        }

        this.tweens.add({
            targets: title,
            y: title.y + 5,
            duration: 4000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        const versionText = this.add.text(centerX, title.y + title.height + 20, 'Version v0.10.0 (alpha)', {
            fontSize: '36px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);
    }
}

export default MainMenuScene;
