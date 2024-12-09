import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

// --------------------------------- // MainMenuScene // --------------------------------- //
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
        this.load.image('backgroundMain', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871'); // Load high-quality background image
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
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ensure the image is scaled to fit the screen
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

        const versionText = this.add.text(centerX, title.y + title.height + 20, 'Version v0.14.8 (alpha)', {
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
        const disclaimer = this.add.text(centerX, this.cameras.main.height - 25, "Alpha Version: This game is in early development. Features may be incomplete or change. The game works best in full screen mode (F11 on Windows) and press F5 to refresh the game.", {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 40
            }
        }).setOrigin(0.5);

        // Setup buttons
        this.setupMainMenuButtons(centerX, versionText.y + versionText.height + 50);
    }

    setupMainMenuButtons(centerX, startY) {
        // Add Start Game Button
        const startButton = this.add.text(centerX, startY, 'Start Game', {
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
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => startButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.startGame());

        this.startGame = function() {
            this.audioManager.stopAllMusic(); // Stop music before starting the game
            this.cameras.main.fade(1500, 0, 0, 0);
            this.time.delayedCall(1500, () => {
                this.scene.start('SaveMenuScene'); // Corrected scene key
            });
        };

        // Add Settings Button
        const settingsButton = this.add.text(centerX, startButton.y + startButton.height + 20, 'Settings', {
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
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => settingsButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => settingsButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('SettingsScene'));

        // Add Credits Button
        const creditsButton = this.add.text(centerX, settingsButton.y + settingsButton.height + 20, 'Credits', {
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
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => creditsButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => creditsButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.transitionToCreditsScene());

        this.transitionToCreditsScene = function() {
            this.audioManager.stopAllMusic(); // Stop music before transitioning to credits
            this.cameras.main.fade(1500, 0, 0, 0);
            this.time.delayedCall(1500, () => {
                this.scene.start('CreditsScene');
            });
        };

        // Add Feedback Button
        const feedbackButton = this.add.text(centerX, creditsButton.y + creditsButton.height + 20, 'Feedback', {
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
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => feedbackButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => feedbackButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.showEmail());

        this.showEmail = function() {
            const emailText = this.add.text(centerX, centerY + 100, 'Send your feedback to: thunderheadpictures@gmail.com\nSubject: Game Feedback', {
                fontSize: '28px',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                align: 'center',
                wordWrap: {
                    width: this.cameras.main.width - 50
                }
            }).setOrigin(0.5);

            this.time.delayedCall(10000, () => {
                emailText.destroy();
            });
        };

        // Add Exit Button
        const exitButton = this.add.text(centerX, feedbackButton.y + feedbackButton.height + 20, 'Exit Game', {
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
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => exitButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => exitButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('ExitConfirmationScene'));
    }
}

export default MainMenuScene;
