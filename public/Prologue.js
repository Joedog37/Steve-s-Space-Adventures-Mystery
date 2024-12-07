import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

// --------------------------------- // Prologue // --------------------------------- //
class Prologue extends Phaser.Scene {
    constructor() {
        super({ key: 'Prologue' });
        this.backgroundManager = null;
        this.audioManager = null; // Add audio manager
    }

    preload() {
        console.log('Prologue: preload started');
        this.backgroundManager = new BackgroundManager(this);
        this.audioManager = new AudioManager(this); // Initialize audio manager

        // Load the background image
        if (!this.textures.exists('backgroundPrologue')) {
            this.load.image('backgroundPrologue', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/galaxy-3608029_1920.jpg?v=1733597991156');
        }

        // Load the intro speech
        this.audioManager.addAudioAsset('introSpeech', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Intro%20speech%20ai%20Andrew%20English.mp3?v=1733579526990');
        this.audioManager.loadAudio();

        console.log('Prologue: preload completed');
    }

    create() {
        console.log('Prologue: create started');
        this.children.removeAll();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        // Check if the texture is already loaded
        if (this.textures.exists('backgroundPrologue')) {
            console.log('Texture backgroundPrologue exists');
        } else {
            console.error('Texture backgroundPrologue not found');
        }

        // Add background image without reloading
        const background = this.add.image(centerX, centerY, 'backgroundPrologue').setOrigin(0.5);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ensure the image is scaled to fit the screen

        // Ensure the audio file is loaded before playing it
        this.load.once('complete', () => {
            this.audioManager.playIntroSpeech('introSpeech', 2000); // 2-second fade-in
        }, this);

        this.load.start();

        this.setupIntroScene(centerX, centerY);
        this.showSkipButton();
        console.log('Prologue: create completed');
    }

    setupIntroScene(centerX, centerY) {
        const introText = [
            "Space... an endless void of infinite possibilities.",
            "A cosmic canvas painted with stars, nebulae, and the unknown.",
            "In this vast expanse, I find myself adrift, contemplating the mysteries that surround me.",
            "My name is Steve, and this is where my story begins.",
            "As I gaze into the abyss, memories of my childhood flood back.",
            "I remember when I was young, looking up at the night sky,",
            "dreaming of the day I'd venture beyond the stars.",
            "Little did I know then of the incredible journey that awaited me,",
            "or the profound mysteries I'd encounter along the way.",
            "As I float here, suspended in the cosmic dance,",
            "I can't help but wonder what secrets the universe holds,",
            "and how my story will unfold among the stars.",
            "Join me as we explore the depths of space,",
            "and unravel the enigmas of my past, present, and future."
        ];

        const textStyle = {
            fontSize: '28px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 100
            },
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 2,
                stroke: true,
                fill: true
            }
        };

        const textObjects = introText.map((line, index) => {
            return this.add.text(centerX, this.cameras.main.height + (index * 30), line, textStyle)
                .setOrigin(0.5)
                .setAlpha(1);
        });

        const scrollDuration = 60000; // 60 seconds
        this.tweens.add({
            targets: textObjects,
            y: '-=600',
            duration: scrollDuration,
            ease: 'Linear',
            onComplete: () => {
                this.fadeOutText(textObjects);
            }
        });
    }

    fadeOutText(textObjects) {
        this.tweens.add({
            targets: textObjects,
            alpha: 0,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.transitionToScene('MainMenuScene');
            }
        });
    }

    showSkipButton() {
        const skipButton = this.add.text(this.cameras.main.width - 40, this.cameras.main.height - 40, 'Skip', {
            fontSize: '32px',
            fill: '#ffffff'
        })
        .setOrigin(1)
        .setInteractive()
        .setAlpha(1);

        skipButton.on('pointerup', () => {
            console.log('Skip button pressed');
            this.transitionToScene('MainMenuScene');
        });

        this.tweens.add({
            targets: skipButton,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

        // Make skip button disappear a couple of seconds before intro audio ends
        this.time.delayedCall(58000, () => { // 60 seconds minus 2 seconds
            this.tweens.add({
                targets: skipButton,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    skipButton.destroy();
                }
            });
        });
    }

    setupPrologue(centerX, centerY) {
        const title = this.add.text(centerX, centerY - 300, "Prologue", {
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

        // Add Disclaimer Text
        const disclaimerBg = this.add.rectangle(centerX, this.cameras.main.height - 25, this.cameras.main.width, 50, 0x000000, 0.5);
        const disclaimer = this.add.text(centerX, this.cameras.main.height - 25, "Alpha Version: This game is in early development. Features may be incomplete or change.", {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 40
            }
        }).setOrigin(0.5);

        // Setup buttons
        this.setupButtons(centerX, versionText.y + versionText.height + 50);
    }

    setupButtons(centerX, startY) {
        const buttonData = [
            { text: 'Continue', scene: 'MainMenuScene' },
            { text: 'Credits', scene: 'CreditsScene' }
        ];

        buttonData.forEach((button, index) => {
            const buttonY = startY + index * 60;
            const buttonText = this.add.text(centerX, buttonY, button.text, {
                fontSize: '32px',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setInteractive();

            buttonText.on('pointerdown', () => {
                console.log(`${button.text} button clicked`);
                this.transitionToScene(button.scene);
            });
        });
    }

    transitionToScene(sceneKey) {
        this.audioManager.fadeOutAll(1000); // Fade out music before transitioning
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            console.log(`Transitioning to ${sceneKey}`);
            this.scene.start(sceneKey);
        });
    }
}

// Export the Prologue class
export default Prologue;








