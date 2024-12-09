class TutorialScene extends Phaser.Scene {
    constructor() {
        super('TutorialScene');
    }

    preload() {
        this.load.audio('tutorialNarration', 'path/to/tutorialNarration.mp3');
        this.load.image('steve', 'path/to/steve.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Display Steve's character
        const steve = this.add.image(centerX, centerY - 100, 'steve');
        steve.setScale(0.5); // Adjust the scale if needed

        // Play tutorial narration
        const narration = this.sound.add('tutorialNarration');
        narration.play();

        // Display tutorial text
        const tutorialText = this.add.text(centerX, centerY + 100, 'Welcome to the tutorial! Here you will learn the game mechanics.', {
            fontSize: '24px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 50
            }
        }).setOrigin(0.5);

        // Add a button to proceed to the prologue
        const proceedButton = this.add.text(centerX, centerY + 200, 'Proceed to Prologue', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => proceedButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => proceedButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => {
            this.autoSave();
            this.scene.start('Prologue');
        });

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });
    }

    autoSave() {
        const saveData = {
            scene: 'TutorialScene',
            timestamp: new Date().toISOString()
        };

        // Save the data to local storage
        localStorage.setItem('saveData', JSON.stringify(saveData));
        console.log('Auto-save successful:', saveData);
    }
}

export default TutorialScene;
