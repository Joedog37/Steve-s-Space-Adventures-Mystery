import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
        this.backgroundManager = null;
        this.audioManager = null; // Add audio manager
    }

    preload() {
        console.log('BootScene: preload started');
        this.backgroundManager = new BackgroundManager(this);
        this.audioManager = new AudioManager(this); // Initialize audio manager

        // Load the background image only once in BootScene
        this.load.image('backgroundMain', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');

        // Load the background music
        this.audioManager.loadAudio();
        this.load.audio('bootBackgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');

        console.log('BootScene: preload completed');
    }

    create() {
        console.log('BootScene: create started');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Add loading text
        const loadingText = this.add.text(centerX, centerY, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add background image
        const background = this.add.image(centerX, centerY, 'backgroundMain').setOrigin(0.5);
        background.setAlpha(0);

        // Play the background music
        if (this.audioManager) {
            this.audioManager.playBackgroundMusic('bootBackgroundMusic', 2000); // 2-second fade-in
        } else {
            console.error('AudioManager is not initialized.');
        }

        // Fade in background
        this.tweens.add({
            targets: background,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                loadingText.destroy();
                this.showTitle();
            }
        });

        // Add click event listener to transition to MainMenuScene
        this.input.on('pointerdown', () => {
            this.transitionToMainMenu();
        });

        console.log('BootScene: create completed');
    }

    showTitle() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const title = this.add.text(centerX, centerY, STORY_NAME, {
            fontSize: '64px',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000000',
                blur: 5,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.showContinueText();
            }
        });
    }

    showContinueText() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const continueText = this.add.text(centerX, centerY + 100, 'Click to continue', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: continueText,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });
    }

    transitionToMainMenu() {
        this.audioManager.fadeOutAll(1000); // Fade out music before transitioning
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            this.scene.start('MainMenuScene');
        });
    }
}

export default BootScene;
