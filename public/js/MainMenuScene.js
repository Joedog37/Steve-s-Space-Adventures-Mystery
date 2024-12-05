//MainMenuScene
import BackgroundManager from './js/BackgroundManager.js';
import AudioManager from './js/AudioManager.js';
import GameScene from './js/GameScene.js';

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
        this.backgroundManager = null;
        this.audioManager = null;
    }

    preload() {
        this.backgroundManager = new BackgroundManager(this);
        this.backgroundManager.preload('mainMenuBackground', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
        this.audioManager = new AudioManager(this);
        this.audioManager.preload();
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.backgroundManager.create('mainMenuBackground', centerX, centerY);

        const title = this.add.text(centerX, centerY - 200, "Steve's Space Adventure Mystery", {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const startButton = this.add.text(centerX, centerY, 'Start Game', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        const settingsButton = this.add.text(centerX, centerY + 100, 'Settings', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        settingsButton.on('pointerdown', () => {
            // Add logic to transition to settings scene
        });

        const creditsButton = this.add.text(centerX, centerY + 200, 'Credits', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        creditsButton.on('pointerdown', () => {
            // Add logic to transition to credits scene
        });

        this.audioManager.playBackgroundMusic('bootupMusic');
    }
}

export default MainMenuScene;
