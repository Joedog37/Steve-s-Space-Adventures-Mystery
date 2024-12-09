import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class IntroScene1 extends Phaser.Scene {
    constructor() {
        super('IntroScene1');
    }

    preload() {
        console.log('Preloading assets...');
        this.load.audio('nameSpeech', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/whats%20your%20name%20Andrew%20J%20Griffin%20recoderd%20on%2012-08-2024.mp3?v=1733669175735');
        this.load.image('autoSaveIcon', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/floppy-disc.gif?v=1733780136985');
    }

    create() {
        console.log('Creating scene...');
        this.cameras.main.setBackgroundColor('#000000');

        const speech = this.sound.add('nameSpeech', { volume: 0 });
        speech.play();
        this.tweens.add({
            targets: speech,
            volume: 1,
            duration: 2000,
            ease: 'Power2'
        });

        const introText = "Oh, hey there. My name is Steve Burden. Yeah, that Burden, that famous Burden that you probably heard from them books.\n\nYeah, that's Steve. No, what is his name? Oh yeah, I remember. Stain Burden.\n\nYeah, well, I'm not him. He's in the future. Yeah, we have this paperwork we have to fill out first though.\n\nSo tell me a little bit about yourself. What's your name?";
        const textDisplay = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 150, introText, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100 }
        }).setOrigin(0.5);
        textDisplay.setAlpha(0);
        this.tweens.add({
            targets: textDisplay,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

        speech.once('complete', () => {
            this.showNameInput();
        });

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    showNameInput() {
        if (this.sound.get('nameSpeech').isPlaying) {
            this.sound.get('nameSpeech').stop();
        }

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

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.style.position = 'absolute';
        submitButton.style.left = `${this.cameras.main.width / 2 - 50}px`;
        submitButton.style.top = `${this.cameras.main.height / 2 + 40}px`;
        submitButton.style.width = '100px';
        submitButton.style.height = '30px';
        submitButton.style.fontSize = '24px';
        document.body.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            const playerName = nameInput.value;
            console.log(`Player name: ${playerName}`);
            localStorage.setItem('playerName', playerName);
            this.autoSave('IntroScene2');
            document.body.removeChild(nameInput);
            document.body.removeChild(submitButton);
            this.showAutoSaveIcon();
            this.scene.start('IntroScene2');
        });
    }

    autoSave(nextScene) {
        const saveData = {
            playerName: localStorage.getItem('playerName'),
            nextScene: nextScene
        };

        try {
            localStorage.setItem('saveData', JSON.stringify(saveData));
            console.log('Auto-save successful:', saveData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
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

export default IntroScene1;




















