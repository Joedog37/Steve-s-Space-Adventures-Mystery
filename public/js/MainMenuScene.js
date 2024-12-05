import AudioManager from '../AudioManager.js';
import BackgroundManager from '../BackgroundManager.js';
import createStartButton from '../buttons/StartButton.js';
import createLoadButton from '../buttons/LoadButton.js';
import createSettingsButton from '../buttons/SettingsButton.js';
import createCreditsButton from '../buttons/CreditsButton.js';
import createFeedbackButton from '../buttons/FeedbackButton.js';
import createExitButton from '../buttons/ExitButton.js';

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
        this.audioManager = null;
        this.backgroundManager = null;
    }

    preload() {
        console.log('MainMenuScene: preload started');
        this.audioManager = new AudioManager(this);
        this.audioManager.loadAudio();
        this.load.audio('mainMenuBackgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497'); // Load main menu background music
        this.backgroundManager = new BackgroundManager(this);
        this.backgroundManager.preload('backgroundMain', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
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
        this.backgroundManager.create('backgroundMain', centerX, centerY).then((background) => {
            this.audioManager.playBackgroundMusic('mainMenuBackgroundMusic', 2000); // 2-second fade-in
            this.setupMainMenu(centerX, centerY);
        }).catch((error) => {
            console.error(error.message);
        });

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

        // Add buttons
        createStartButton(this, centerX, versionText.y + versionText.height + 50);
        createLoadButton(this, centerX, versionText.y + versionText.height + 100);
        createSettingsButton(this, centerX, versionText.y + versionText.height + 150);
        createCreditsButton(this, centerX, versionText.y + versionText.height + 200);
        createFeedbackButton(this, centerX, versionText.y + versionText.height + 250);
        createExitButton(this, centerX, versionText.y + versionText.height + 300);

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
    }
}

export default MainMenuScene;


