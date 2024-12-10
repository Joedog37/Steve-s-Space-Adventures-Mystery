import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class IntroScene2 extends Phaser.Scene {
    constructor() {
        super('IntroScene2');
    }

    preload() {
        console.log('Preloading assets...');
        // Load the correct audio file
        this.load.audio('ageQuestion', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/whats%20your%20age%20Andrew%20J%20Griffin%20recoderd%20on%2012-08-2024.mp3?v=1733697050637');
        // Load the auto-save icon
        this.load.image('autoSaveIcon', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/floppy-disc.gif?v=1733780136985'); // Ensure the path is correct
    }

    create() {
        console.log('Creating scene...');
        // Set a black background color
        this.cameras.main.setBackgroundColor('#000000');

        // Play the age question audio automatically with fade-in effect
        console.log('Playing age question audio...');
        const ageQuestionAudio = this.sound.add('ageQuestion', { volume: 0 });
        ageQuestionAudio.play();

        // Fade in the audio
        this.tweens.add({
            targets: ageQuestionAudio,
            volume: 1,
            duration: 2000,
            ease: 'Power2'
        });

        // Display the initial dialogue
        const initialText = "Now that I know your name, how old are you?\nIf you're over 18, click Yes.\nIf you're not 18, click No.\nDon't worry, we'll still have you play.";
        const textDisplay = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, initialText, {
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
                // Show the "Yes" and "No" buttons after the initial text fades in
                this.time.delayedCall(2000, () => {
                    const yesButton = this.add.text(this.cameras.main.width / 2 - 50, this.cameras.main.height / 2 + 100, 'Yes', {
                        fontSize: '24px',
                        fill: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

                    const noButton = this.add.text(this.cameras.main.width / 2 + 50, this.cameras.main.height / 2 + 100, 'No', {
                        fontSize: '24px',
                        fill: '#ffffff',
                        backgroundColor: '#000000',
                        padding: { x: 10, y: 5 },
                        borderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

                    yesButton.on('pointerdown', () => {
                        // Save age to local storage
                        localStorage.setItem('age', 'over 18');
                        // Auto-save the game state
                        this.autoSave();
                        // Proceed to gender selection
                        this.scene.start('IntroScene3');
                    });

                    noButton.on('pointerdown', () => {
                        // Ask if they have permission to play the game
                        textDisplay.setText("Did you ask your parent or guardian to play this game?");
                        yesButton.setText('Yes');
                        noButton.setText('No');

                        yesButton.on('pointerdown', () => {
                            // Save age to local storage
                            localStorage.setItem('age', 'under 18');
                            // Auto-save the game state
                            this.autoSave();
                            // Proceed to the character selection
                            this.scene.start('IntroScene3');
                        });

                        noButton.on('pointerdown', () => {
                            // Go back to the main menu
                            this.scene.start('MainMenuScene');
                        });
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

    autoSave() {
        const saveData = {
            age: localStorage.getItem('age')
        };

        // Save the data to local storage
        localStorage.setItem('saveData', JSON.stringify(saveData));
        console.log('Auto-save successful:', saveData);
        this.showAutoSaveIcon();
    }

    showAutoSaveIcon() {
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
    }
}

export default IntroScene2;







