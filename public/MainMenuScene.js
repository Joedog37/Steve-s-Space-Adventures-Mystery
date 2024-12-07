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

        const versionText = this.add.text(centerX, title.y + title.height + 20, 'Version v0.11.0 (alpha)', {
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
            { text: 'Start Game', scene: 'Prologue' },
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

// Export the MainMenuScene class
export default MainMenuScene;


