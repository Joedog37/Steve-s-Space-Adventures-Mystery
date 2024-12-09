import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class GenderScene extends Phaser.Scene {
    constructor() {
        super('GenderScene');
    }

    preload() {
        console.log('Preloading assets...');
        // Load any assets needed for this scene
        // Load the auto-save icon
        this.load.image('autoSaveIcon', 'path/to/autoSaveIcon.png');
    }

    create() {
        console.log('Creating scene...');
        // Set a black background color
        this.cameras.main.setBackgroundColor('#000000');

        // Display the initial dialogue
        const initialText = "Are you male or female?";
        const textDisplay = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, initialText, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100 }
        }).setOrigin(0.5);
        textDisplay.setAlpha(0); // Set initial alpha to 0 for fade-in effect

        // Fade in the initial text
        this.tweens.add({
            targets: textDisplay,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                // Show the gender options after the initial text fades in
                this.time.delayedCall(2000, () => {
                    const maleButton = this.add.text(this.cameras.main.width / 2 - 50, this.cameras.main.height / 2 + 50, 'Male', {
                        fontSize: '24px',
                        fill: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

                    const femaleButton = this.add.text(this.cameras.main.width / 2 + 50, this.cameras.main.height / 2 + 50, 'Female', {
                        fontSize: '24px',
                        fill: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

                    maleButton.on('pointerdown', () => {
                        // Save the gender selection
                        this.saveToFile('Male');
                    });

                    femaleButton.on('pointerdown', () => {
                        // Save the gender selection
                        this.saveToFile('Female');
                    });
                });
            }
        });

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    saveToFile(gender) {
        // Show the auto-save icon
        const autoSaveIcon = this.add.image(this.cameras.main.width - 50, 50, 'autoSaveIcon').setOrigin(0.5);
        autoSaveIcon.setAlpha(0); // Set initial alpha to 0 for fade-in effect
        this.tweens.add({
            targets: autoSaveIcon,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        // Retrieve the existing save data from local storage
        let saveData = JSON.parse(localStorage.getItem('saveData')) || {};
        saveData.gender = gender;

        // Save the updated data back to local storage
        localStorage.setItem('saveData', JSON.stringify(saveData));

        // Hide the auto-save icon after saving
        this.tweens.add({
            targets: autoSaveIcon,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            delay: 1000,
            onComplete: () => {
                autoSaveIcon.destroy();
                // Display the thank you message
                const thankYouText = "Thanks for your pick! Let's move on.";
                const thankYouDisplay = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, thankYouText, {
                    fontSize: '24px',
                    fill: '#ffffff',
                    align: 'center',
                    wordWrap: { width: this.cameras.main.width - 100 }
                }).setOrigin(0.5);
                thankYouDisplay.setAlpha(0); // Set initial alpha to 0 for fade-in effect

                // Fade in the thank you message
                this.tweens.add({
                    targets: thankYouDisplay,
                    alpha: 1,
                    duration: 2000,
                    ease: 'Power2',
                    onComplete: () => {
                        // Transition to the Prologue scene after the thank you message
                        this.time.delayedCall(2000, () => {
                            this.scene.start('Prologue');
                        });
                    }
                });
            }
        });
    }
}

export default GenderScene;




