import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

// --------------------------------- // BootScene // --------------------------------- //
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
        this.backgroundManager = null;
        this.audioManager = null; // Add audio manager
    }

    preload() {
        console.log('BootScene: preload started');
        this.backgroundManager = new BackgroundManager(this);
        this.audioManager = new AudioManager(this); // Initialize audio manager

        // Load the background image
        if (!this.textures.exists('backgroundMain')) {
            this.load.image('backgroundMain', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
        }

        // Load the logo image if not already loaded
        if (!this.textures.exists('logo')) {
            this.load.image('logo', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Thunderhead%20Pictures%20new%20logo_processed.png?v=1733590536426');
        }

        // Load the background music
        this.audioManager.loadAudio();
        this.load.audio('bootBackgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');

        console.log('BootScene: preload completed');
    }

    create() {
        console.log('BootScene: create started');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Add background color
        this.cameras.main.setBackgroundColor('#000000');

        // Add warning text
        const warningText = this.add.text(centerX, centerY - 50, 'This game uses auto-save. Do not turn off your device while the save indicator is displayed. Warning: This game contains bright lights and flashing images that may cause discomfort or trigger seizures for people with photosensitive epilepsy.', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 40
            }
        }).setOrigin(0.5);

        this.time.delayedCall(7000, () => {
            warningText.destroy();
            this.showLogo(centerX, centerY);
        });

        console.log('BootScene: create completed');
    }

    showLogo(centerX, centerY) {
        // Add logo image
        const logo = this.add.image(centerX, centerY, 'logo').setOrigin(0.5);
        logo.setAlpha(0);

        this.tweens.add({
            targets: logo,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    logo.destroy();
                    this.fadeInBackground(centerX, centerY);
                });
            }
        });
    }

    fadeInBackground(centerX, centerY) {
        // Add background image
        const background = this.add.image(centerX, centerY, 'backgroundMain').setOrigin(0.5);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ensure the image is scaled to fit the screen
        background.setAlpha(0);

        this.tweens.add({
            targets: background,
            alpha: 1,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                this.showTitle(centerX, centerY);
            }
        });
    }

    showTitle(centerX, centerY) {
        // Add title text
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

        // Add glimmer effect
        title.setStyle({
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: '#00ff00', // Ensure the text color is green
            animation: 'glimmer 2s infinite'
        });

        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Title fade-in completed');
                this.showAudioPrompt(centerX, centerY);
            }
        });
    }

    showAudioPrompt(centerX, centerY) {
        const audioPromptText = this.add.text(centerX, centerY + 100, 'Click anywhere to enable audio', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: audioPromptText,
            alpha: 1,
            duration: 2000,
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
            duration: 2000,
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























