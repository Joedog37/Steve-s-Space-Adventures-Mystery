import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

// --------------------------------- // BootScene // --------------------------------- //
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
        background.setDisplaySize(1920, 1080); // Ensure the image is scaled to 1080p
        background.setAlpha(0);

        // Fade in background
        this.tweens.add({
            targets: background,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Background fade-in completed');
                loadingText.destroy();
                this.showTitle();
            }
        });

        console.log('BootScene: create completed');
    }

    showTitle() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const title = this.add.text(centerX, centerY, "Steve's Space Adventure Mystery", {
            fontSize: '64px',
            fontStyle: 'bold',
            fill: '#00ff00', // Green color
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000000',
                blur: 5,
                stroke: true,
                fill: true
            },
            fontFamily: 'Orbitron' // Sci-fi futuristic font
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Title fade-in completed');
                this.add3DWavyAnimation(title);
                this.showAudioPrompt();
            }
        });
    }

    add3DWavyAnimation(target) {
        this.tweens.add({
            targets: target,
            scaleX: { value: 1.1, duration: 1000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 },
            scaleY: { value: 1.1, duration: 1000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 },
            angle: { value: 10, duration: 1000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 }
        });
    }

    showAudioPrompt() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2 + 100; // Adjusted position to be below the title

        const audioPromptText = this.add.text(centerX, centerY, 'Click anywhere to enable audio', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: audioPromptText,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Audio prompt fade-in completed');
            }
        });

        // Add click event listener to enable audio and show continue button
        this.input.once('pointerdown', () => {
            console.log('Audio enabled by user click');
            audioPromptText.destroy();
            this.enableAudio();
        });
    }

    enableAudio() {
        // Play the background music
        if (this.audioManager) {
            this.audioManager.playBackgroundMusic('bootBackgroundMusic', 2000); // 2-second fade-in
            console.log('Background music started');
        } else {
            console.error('AudioManager is not initialized.');
        }

        this.showContinueButton();
    }

    showContinueButton() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2 + 200; // Adjusted position to be below the title and audio prompt

        const continueButton = this.add.text(centerX, centerY, 'Click to continue to the main menu', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0).setInteractive();

        this.tweens.add({
            targets: continueButton,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Continue button fade-in completed');
            }
        });

        continueButton.on('pointerdown', () => {
            console.log('Continue button clicked');
            this.transitionToMainMenu();
        });
    }

    transitionToMainMenu() {
        this.audioManager.fadeOutAll(1000); // Fade out music before transitioning
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            console.log('Transitioning to MainMenuScene');
            this.scene.start('MainMenuScene');
        });
    }
}

// Export the BootScene class
export default BootScene;












