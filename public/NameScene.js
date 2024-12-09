import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class NameScene extends Phaser.Scene {
    constructor() {
        super('NameScene');
    }

    preload() {
        console.log('Preloading assets...');
        // Load your audio file
        this.load.audio('nameSpeech', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/whats%20your%20name%20Andrew%20J%20Griffin%20recoderd%20on%2012-08-2024.mp3?v=1733669175735');
        // Load the auto-save icon
        this.load.image('autoSaveIcon', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/autoSaveIcon.png?v=1733678854769'); // Ensure the path is correct
    }

    create() {
        console.log('Creating scene...');
        // Set a black background color
        this.cameras.main.setBackgroundColor('#000000');

        // Play the name speech automatically with fade-in effect
        console.log('Playing name speech...');
        const nameSpeech = this.sound.add('nameSpeech', { volume: 0 });
        nameSpeech.play();

        // Fade in the audio
        this.tweens.add({
            targets: nameSpeech,
            volume: 1,
            duration: 2000,
            ease: 'Power2'
        });

        // Display the text at the bottom of the screen
        const introText = "Oh, hey there. My name is Steve Burden. Yeah, that Burden, that famous Burden that you probably heard from them books.\n\nYeah, that's Steve. No, what is his name? Oh yeah, I remember. Stain Burden.\n\nYeah, well, I'm not him. He's in the future. Yeah, we have this paperwork we have to fill out first though.\n\nSo tell me a little bit about yourself. What's your name?";
        const textDisplay = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 150, introText, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100 }
        }).setOrigin(0.5);
        textDisplay.setAlpha(0); // Set initial alpha to 0 for fade-in effect

        // Fade in the text
        this.tweens.add({
            targets: textDisplay,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

        // Create a button to show the input box
        const showInputButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, 'Click to enter your name', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            borderRadius: 5,
            borderColor: '#ffffff',
            borderWidth: 1
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        showInputButton.setAlpha(0); // Set initial alpha to 0 for fade-in effect

        // Fade in the button
        this.tweens.add({
            targets: showInputButton,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

        // Add event listener to the button
        showInputButton.on('pointerdown', () => {
            // Show the input box for entering the name
            this.showNameInput();
        });

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    showNameInput() {
        // Create an HTML input element for entering the name
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter your name';
        nameInput.style.position = 'absolute';
        nameInput.style.left = `${this.cameras.main.width / 2 - 100}px`;
        nameInput.style.top = `${this.cameras.main.height / 2}px`;
        nameInput.style.width = '200px';
        nameInput.style.height = '30px';
        nameInput.style.fontSize = '24px';
        nameInput.style.textAlign = 'center';
        document.body.appendChild(nameInput);

        // Create a button to submit the name
        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.style.position = 'absolute';
        submitButton.style.left = `${this.cameras.main.width / 2 - 50}px`;
        submitButton.style.top = `${this.cameras.main.height / 2 + 40}px`;
        submitButton.style.width = '100px';
        submitButton.style.height = '30px';
        submitButton.style.fontSize = '24px';
        document.body.appendChild(submitButton);

        // Add event listener to the submit button
        submitButton.addEventListener('click', () => {
            const playerName = nameInput.value;
            console.log(`Player name: ${playerName}`);
            // Save the player's name to local storage
            localStorage.setItem('playerName', playerName);
            // Auto-save the game state
            this.autoSave('AgeScene');
            // Remove the input elements from the DOM
            document.body.removeChild(nameInput);
            document.body.removeChild(submitButton);
            // Show the auto-save icon
            this.showAutoSaveIcon();
            // Proceed to the next scene
            this.scene.start('AgeScene');
        });
    }

    autoSave(nextScene) {
        const saveData = {
            playerName: localStorage.getItem('playerName'),
            nextScene: nextScene // Save the next scene name
        };

        // Save to local storage
        try {
            localStorage.setItem('saveData', JSON.stringify(saveData));
            console.log('Auto-save successful:', saveData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    showAutoSaveIcon() {
        // Add auto-save icon
        const autoSaveIcon = this.add.image(50, 50, 'autoSaveIcon').setOrigin(0.5);
        autoSaveIcon.setDisplaySize(32, 32); // Adjust the size as needed
    }
}

export default NameScene;

















