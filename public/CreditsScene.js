import AudioManager from './AudioManager.js';
import BackgroundManager from './BackgroundManager.js';

// --------------------------------- // CreditsScene // --------------------------------- //
class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
        this.additionalCredits = [];
    }

    preload() {
        this.audioManager = new AudioManager(this);
        this.backgroundManager = new BackgroundManager(this);
        this.audioManager.loadAudio();
        this.load.audio('creditsBackgroundMusic', 'https://play.rosebud.ai/assets/Journey\'s End.mp3?eMBv'); // Load the credits music with a unique identifier
        this.load.image('creditsBackground', 'https://play.rosebud.ai/assets/AI art for credits scene background.png?9Vd8'); // Load your new background image
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Add new background image and fit it to the scene size
        const background = this.add.image(centerX, centerY, 'creditsBackground').setOrigin(0.5);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Stop any currently playing background music
        this.audioManager.stopAllMusic();

        // Play the new credits music
        if (this.audioManager) {
            this.audioManager.playBackgroundMusic('creditsBackgroundMusic', 2000); // 2-second fade-in
        } else {
            console.error('AudioManager is not initialized.');
        }

        const creditsContent = [
            "Steve's Space Adventure Mystery",
            "",
            "Story by Joseph Rice",
            "This is the prequel to the \"My Story In Space\" book series",
            "Available in online stores now",
            "",
            "Credits",
            "",
            "Game Design and Development",
            "Joseph Rice",
            "",
            "Special Thanks",
            "The Phaser.js Community",
            "",
            "Artwork",
            "Milky Way Galaxy during nighttime",
            "Photo by Hristo Fidanov from Pexels",
            "https://www.pexels.com/photo/milky-way-galaxy-during-nighttime-1252890/",
            "",
            "Galaxy Image",
            "Image by Lumina Obscura from Pixabay",
            "",
            "Voice Acting",
            "AI-generated voice by ElevenLabs",
            "",
            "Voice by Joseph Rice",
            "Voice changed by Eleven Labs.io AI Andrew J Griffin",
            "",
            "\"What's your age?\" - Andrew J Griffin",
            "\"What's your name?\" - Andrew J Griffin",
            "",
            "Music",
            "Track: \"Journey's End\"",
            "Composed by: Suno AI (https://suno.ai), Version 3.5",
            "",
            "Track: \"Space Explorers\"",
            "Composed by: Kevin MacLeod (incompetech.com)",
            "Licensed under Creative Commons: By Attribution 4.0 License",
            "http://creativecommons.org/licenses/by/4.0/",
            "",
            "Credits Scene Background Image",
            "Image Title: Galactic End Credits",
            "Image Description: A captivating AI-generated image representing the vastness of space, featuring a beautiful array of stars and galaxies.",
            "Created by: Microsoft Copilot",
            "Source: Generated using advanced AI tools",
            "",
            "Tools Used",
            "Phaser",
            "",
            "Assets",
            "UI Elements by lemongreen",
            "Licensed under Creative Commons Attribution v4.0 International",
            "Source: Itch.io",
            "",
            "Disclaimer",
            "All characters, names, and events in this game are fictional.",
            "Any resemblance to real persons, living or dead, or actual events is purely coincidental.",
            "© 2024 Joseph Rice. All rights reserved."
        ];

        const creditsText = this.add.text(centerX, this.cameras.main.height, creditsContent.join('\n'), {
            fontSize: '28px',
            fill: '#00ff00', // Change text color to green for better visibility
            align: 'center',
            lineSpacing: 15,
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
        }).setOrigin(0.5, 0).setAlpha(0);

        const scrollDuration = 169000; // Duration for scrolling text in milliseconds (169 seconds for 2:49)
        const fadeInDuration = 2000; // Duration for fading in the text

        this.tweens.add({
            targets: creditsText,
            alpha: 1,
            duration: fadeInDuration,
            ease: 'Power2',
        });

        // Scroll the credits text
        this.tweens.add({
            targets: creditsText,
            y: -creditsText.height,
            duration: scrollDuration,
            ease: 'Linear',
            onComplete: () => {
                this.showThankYouMessage();
            }
        });

        this.showSkipButton(scrollDuration);
    }

    showThankYouMessage() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const thankYouText = this.add.text(centerX, centerY, 'Thank you for playing!', {
            fontSize: '48px',
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
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: thankYouText,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.fadeOutBackgroundMusic();
                });
            }
        });
    }

    fadeOutBackgroundMusic() {
        const music = this.sound.get('creditsBackgroundMusic');
        if (music) {
            this.tweens.add({
                targets: music,
                volume: 0,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                    this.audioManager.stopAllMusic();
                    this.transitionToMainMenu();
                }
            });
        } else {
            this.transitionToMainMenu();
        }
    }

    showSkipButton(scrollDuration) {
        const skipButton = this.add.text(20, 20, 'Skip Credits', {
            fontSize: '24px',
            fill: '#ffffff',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => skipButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => skipButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => {
            console.log('Skip Credits button clicked, transitioning to MainMenuScene');
            this.transitionToMainMenu();
        });

        skipButton.setAlpha(0); // Start with the button invisible

        const fadeInDuration = 2000; // Duration for fading in the button

        // Fade in the skip button more smoothly
        this.tweens.add({
            targets: skipButton,
            alpha: 0.8,
            duration: fadeInDuration,
            ease: 'Power2',
            delay: 1000 // Delay before starting the fade-in
        });

        // Make the skip button disappear a couple of seconds before the credits finish
        this.time.delayedCall(scrollDuration - 5000, () => { // 5 seconds before the end
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

    transitionToMainMenu() {
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            this.scene.start('MainMenuScene');
        });
    }
}

export default CreditsScene;







