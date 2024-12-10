import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';

class EpisodeSelectionScene extends Phaser.Scene {
    constructor() {
        super('EpisodeSelectionScene');
        this.audioManager = null;
        this.currentEpisode = 1;
        this.totalEpisodes = 3; // Update this if you have more episodes
        this.completedEpisodes = JSON.parse(localStorage.getItem('completedEpisodes')) || [true, false, false]; // Track completed episodes
    }

    preload() {
        console.log('EpisodeSelectionScene: preload started');
        this.audioManager = new AudioManager(this);
        this.audioManager.loadAudio();
        this.load.image('leftArrow', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Left%20Arrow.png?v=1733688159310'); // Load left arrow image
        this.load.image('rightArrow', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Right%20Arrow.png?v=1733687871958'); // Load right arrow image
        this.load.audio('buttonClick', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/721257__anjashosting__ui_button_click.mp3?v=1733689396288'); // Load button click sound effect
        console.log('EpisodeSelectionScene: preload completed');
    }

    create() {
        console.log('EpisodeSelectionScene: create started');
        this.children.removeAll();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        // Add title
        const title = this.add.text(centerX, 100, 'Select Episode', {
            fontSize: '48px',
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
            }
        }).setOrigin(0.5);

        // Add left and right arrows
        const leftArrow = this.add.image(100, centerY, 'leftArrow').setOrigin(0.5).setInteractive({ useHandCursor: true });
        const rightArrow = this.add.image(this.cameras.main.width - 100, centerY, 'rightArrow').setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Resize the arrows
        leftArrow.setDisplaySize(50, 50); // Adjust the size as needed
        rightArrow.setDisplaySize(50, 50); // Adjust the size as needed

        leftArrow.on('pointerdown', () => {
            this.sound.play('buttonClick');
            this.changeEpisode(-1);
        });
        rightArrow.on('pointerdown', () => {
            this.sound.play('buttonClick');
            this.changeEpisode(1);
        });

        // Add episode title
        this.episodeTitle = this.add.text(centerX, this.cameras.main.height - 100, 'Episode 1: The Beginning', {
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

        // Add "Start Episode" button
        this.startButton = this.add.text(centerX, this.cameras.main.height - 50, 'Start Episode', {
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
        }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            if (this.completedEpisodes[this.currentEpisode - 1]) {
                this.sound.play('buttonClick');
                this.time.delayedCall(100, () => {
                    if (this.currentEpisode === 1) {
                        this.startEpisode('IntroScene1');
                    } else {
                        this.startEpisode(`Episode${this.currentEpisode}Scene`);
                    }
                });
            }
        });

        // Set initial episode display
        this.updateEpisodeDisplay();

        console.log('EpisodeSelectionScene: create completed');
    }

    changeEpisode(direction) {
        this.currentEpisode += direction;
        if (this.currentEpisode < 1) {
            this.currentEpisode = this.totalEpisodes;
        } else if (this.currentEpisode > this.totalEpisodes) {
            this.currentEpisode = 1;
        }

        this.updateEpisodeDisplay();
    }

    updateEpisodeDisplay() {
        switch (this.currentEpisode) {
            case 1:
                this.episodeTitle.setText('Episode 1: The Beginning');
                break;
            case 2:
                this.episodeTitle.setText('Episode 2: The Journey Continues');
                break;
            case 3:
                this.episodeTitle.setText('Episode 3');
                break;
            // Add more cases if you have more episodes
        }

        // Disable the "Start Episode" button if the episode is locked
        if (!this.completedEpisodes[this.currentEpisode - 1]) {
            this.startButton.setAlpha(0.5); // Make the text semi-transparent
            this.startButton.disableInteractive(); // Disable interaction
        } else {
            this.startButton.setAlpha(1); // Make the text fully opaque
            this.startButton.setInteractive({ useHandCursor: true }); // Enable interaction
        }
    }

    startEpisode(sceneKey) {
        this.audioManager.stopAllMusic(); // Stop music before starting the episode
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
            this.scene.start(sceneKey);
        });
    }

    completeEpisode(episodeNumber) {
        this.completedEpisodes[episodeNumber - 1] = true;
        localStorage.setItem('completedEpisodes', JSON.stringify(this.completedEpisodes));
        this.saveToFile(); // Save to file after completing an episode
    }

    saveToFile() {
        const saveData = {
            completedEpisodes: this.completedEpisodes
        };
        const blob = new Blob([JSON.stringify(saveData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'saveData.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export default EpisodeSelectionScene;















