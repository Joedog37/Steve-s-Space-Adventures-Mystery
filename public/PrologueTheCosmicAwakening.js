import AudioManager from './AudioManager.js';

// --------------------------------- // Prologue: The Cosmic Awakening // --------------------------------- //
class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
        console.log('IntroScene: Constructor called');
        this.audioManager = null;
        this.introSpeechKey = 'introSpeech'; // Key for the intro speech audio
        this.backgroundMusicKey = 'introBackgroundMusic'; // Key for the background music audio
    }

    preload() {
        console.log('IntroScene: preload started');
        this.audioManager = new AudioManager(this);
        this.audioManager.addAudioAsset(this.introSpeechKey, 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Intro%20speech%20ai%20Andrew%20English.mp3?v=1733355860018');
        this.audioManager.addAudioAsset(this.backgroundMusicKey, 'https://play.rosebud.ai/assets/space explorers.mp3?7jfX');
        this.audioManager.loadAudio();
        console.log('IntroScene: preload completed');
    }

    create() {
        console.log('IntroScene: create started');
        this.children.removeAll(true);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        // Add background image
        const background = this.add.image(centerX, centerY, 'backgroundMain').setOrigin(0.5);

        if (this.cache.audio.exists(this.introSpeechKey)) {
            console.log(`Audio ${this.introSpeechKey} found in cache`);
        } else {
            console.error(`Audio ${this.introSpeechKey} not found in cache`);
        }

        this.setupIntroScene();
        console.log('IntroScene: create completed');

        // Add listener for ESC key to pause and launch PauseMenuScene
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    setupIntroScene() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

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
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100 }
        };

        this.textLines = introText.map((line, index) => {
            return this.add.text(centerX, centerY + (index * 30) - (introText.length * 15), line, textStyle)
                .setOrigin(0.5)
                .setAlpha(0);
        });

        // Delay playing audio to ensure assets are loaded
        this.time.delayedCall(500, () => {
            const introSpeech = this.audioManager.playIntroSpeech(this.introSpeechKey, 2000); // 2-second fade-in
            this.audioManager.playBackgroundMusic(this.backgroundMusicKey, 2000); // 2-second fade-in

            // Listen for when the intro speech completes
            if (introSpeech) {
                introSpeech.once('complete', () => {
                    console.log('Intro speech completed');
                    this.transitionToStoryScene();
                });
            } else {
                console.error('Intro speech not found');
            }
        });

        const fadeDuration = 2000;
        this.tweens.add({
            targets: [...this.textLines],
            alpha: 1,
            duration: fadeDuration,
            ease: 'Power2'
        });

        this.showSkipButton();

        console.log('IntroScene: setup completed');
    }

    showSkipButton() {
        const skipButton = this.add.text(this.cameras.main.width - 40, this.cameras.main.height - 40, 'Skip', {
            fontSize: '32px',
            fill: '#ffffff'
        })
        .setOrigin(1)
        .setInteractive()
        .setAlpha(0);

        skipButton.on('pointerup', () => {
            console.log('Skip button pressed');
            this.transitionToStoryScene();
        });

        this.tweens.add({
            targets: skipButton,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

        // Make skip button disappear a couple of seconds before intro audio ends
        this.time.delayedCall(53000, () => { // 55 seconds minus 2 seconds
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

    transitionToStoryScene() {
        console.log('Transitioning to StoryScene');
        if (this.audioManager) {
            // Specific fade-out for intro speech
            const introSpeech = this.audioManager.playingSounds[this.introSpeechKey];
            if (introSpeech) {
                this.tweens.add({
                    targets: introSpeech,
                    volume: 0,
                    duration: 1000,
                    ease: 'Linear',
                    onComplete: () => {
                        this.audioManager.fadeOutAll(1000).then(() => {
                            this.cameras.main.fade(1500, 0, 0, 0);
                            this.time.delayedCall(1500, () => {
                                this.scene.start('StoryScene');
                            });
                        });
                    }
                });
            } else {
                this.audioManager.fadeOutAll(1000).then(() => {
                    this.cameras.main.fade(1500, 0, 0, 0);
                    this.time.delayedCall(1500, () => {
                        this.scene.start('StoryScene');
                    });
                });
            }
        } else {
            this.cameras.main.fade(1500, 0, 0, 0);
            this.time.delayedCall(1500, () => {
                this.scene.start('
