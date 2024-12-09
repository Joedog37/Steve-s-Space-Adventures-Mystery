import SaveManager from './SaveManager.js';

// --------------------------------- // PauseMenuScene // --------------------------------- //
class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('PauseMenuScene');
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

        const saveButton = this.add.text(centerX, centerY - 60, 'Save Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => saveButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => saveButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                const slotName = prompt('Enter save slot name:');
                if (slotName) {
                    this.saveGame(slotName);
                    this.showMessage('Game saved successfully!');
                }
            });

        const backupButton = this.add.text(centerX, centerY, 'Backup Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backupButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => backupButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.backupGame();
                this.showMessage('Game backed up successfully!');
            });

        const restoreButton = this.add.text(centerX, centerY + 60, 'Restore Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restoreButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => restoreButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => {
                this.restoreGame();
                this.showMessage('Game restored successfully!');
            });

        const resumeButton = this.add.text(centerX, centerY + 120, 'Resume Game', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resumeButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => resumeButton.setStyle({ fill: '#ffffff' }))
            .on('pointerdown', () => this.resumeGame());

        console.log('PauseMenuScene: create completed');
    }

    saveGame(slotName) {
        let gameState = {
            // Include relevant state information here
        };

        localStorage.setItem(slotName, JSON.stringify(gameState));
    }

    backupGame() {
        const saveData = JSON.stringify(localStorage);
        const blob = new Blob([saveData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    restoreGame() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const saveData = JSON.parse(e.target.result);
                for (const key in saveData) {
                    localStorage.setItem(key, saveData[key]);
                }
                this.showMessage('Game restored successfully!');
            };
            reader.readAsText(file);
        };
        input.click();
    }

    showMessage(message) {
        const messageText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, message, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: messageText,
            alpha: { from: 1, to: 0 },
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                messageText.destroy();
            }
        });
    }

    resumeGame() {
        this.scene.stop('PauseMenuScene');
        this.scene.resume('StoryScene'); // Adjust this to the appropriate scene
    }
}

export default PauseMenuScene;
