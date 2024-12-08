// --------------------------------- // PauseMenuScene // --------------------------------- //
class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('PauseMenuScene');
        this.messageText = null;
    }

    preload() {
        console.log('PauseMenuScene: preload started');
        console.log('PauseMenuScene: preload completed');
    }

    create() {
        console.log('PauseMenuScene: create started');
        this.cameras.main.setBackgroundColor('#00000080');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const buttonStyle = {
            fontSize: '32px',
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
        };

        this.messageText = this.add.text(centerX, centerY - 150, '', {
            fontSize: '28px',
            fill: '#ff0',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        const saveButton = this.add.text(centerX, centerY - 60, 'Save Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => saveButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => saveButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.saveGame();
                this.showMessage('Game saved successfully!');
            });

        const loadButton = this.add.text(centerX, centerY, 'Load Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => loadButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => loadButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                const result = this.loadGame();
                this.showMessage(result ? 'Game loaded successfully!' : 'No saved game found.');
            });

        const settingsButton = this.add.text(centerX, centerY + 60, 'Settings', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => settingsButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => settingsButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop('PauseMenuScene');
                this.scene.launch('SettingsScene');
            });

        const resumeButton = this.add.text(centerX, centerY + 120, 'Resume Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resumeButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => resumeButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.resumeGame());

        const exitButton = this.add.text(centerX, centerY + 180, 'Exit Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => exitButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => exitButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('ExitConfirmationScene'));

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });

        console.log('PauseMenuScene: create completed');
    }

    saveGame() {
        let gameState = {};

        if (this.scene.isPaused('StoryScene')) {
            const storyScene = this.scene.get('StoryScene');
            gameState = {
                scene: 'StoryScene',
                currentStoryIndex: storyScene.currentStoryIndex,
                // Include other relevant state information here
            };
        } else if (this.scene.isPaused('IntroScene')) {
            const introScene = this.scene.get('IntroScene');
            gameState = {
                scene: 'IntroScene',
                introCompleted: introScene.introCompleted,
                // Include other relevant state information here
            };
        }

        localStorage.setItem('gameState', JSON.stringify(gameState));
        console.log('Game saved');
    }

    loadGame() {
        const savedState = JSON.parse(localStorage.getItem('gameState'));
        if (savedState) {
            if (savedState.scene === 'StoryScene') {
                const storyScene = this.scene.get('StoryScene');
                storyScene.currentStoryIndex = savedState.currentStoryIndex;
                // Apply other state information here
                this.resumeGame('StoryScene');
            } else if (savedState.scene === 'IntroScene') {
                const introScene = this.scene.get('IntroScene');
                introScene.introCompleted = savedState.introCompleted;
                // Apply other state information here
                this.resumeGame('IntroScene');
            }
            return true;
        } else {
            console.log('No saved game found');
            return false;
        }
    }

    showMessage(message) {
        this.messageText.setText(message);
        this.tweens.add({
            targets: this.messageText,
            alpha: { from: 1, to: 0 },
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                this.messageText.setText('');
                this.messageText.setAlpha(1);
            }
        });
    }

    resumeGame(scene) {
        this.scene.stop('PauseMenuScene');
        this.scene.resume(scene || 'StoryScene');
    }
}

// Export the PauseMenuScene class
export default PauseMenuScene;
