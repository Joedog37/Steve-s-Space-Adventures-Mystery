import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

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

        // Load the auto-save icon
        this.load.image('autoSaveIcon', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/floppy-disc.gif?v=1733780136985'); // Ensure the path is correct

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
        console.log('Prologue: create completed');

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });

        // Show the auto-save icon
        const autoSaveIcon = this.add.image(this.cameras.main.width - 50, 50, 'autoSaveIcon').setOrigin(0.5);
        autoSaveIcon.setDisplaySize(32, 32); // Adjust the size as needed
        autoSaveIcon.setAlpha(0); // Set initial alpha to 0 for fade-in effect
        this.tweens.add({
            targets: autoSaveIcon,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        // Perform auto-save
        this.autoSave();
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

    transitionToScene(sceneKey) {
        this.audioManager.fadeOutAll(1000); // Fade out music before transitioning
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            console.log(`Transitioning to ${sceneKey}`);
            this.scene.start(sceneKey);
        });
    }

    autoSave() {
        const saveData = {
            scene: 'Prologue',
            timestamp: new Date().toISOString()
        };

        // Save the data to local storage
        localStorage.setItem('saveData', JSON.stringify(saveData));
        console.log('Auto-save successful:', saveData);
    }
}

// Export the Prologue class
export default Prologue;









