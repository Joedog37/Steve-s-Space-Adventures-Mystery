// --------------------------------- // SettingsScene // --------------------------------- //
class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const title = this.add.text(centerX, centerY - 250, 'Settings', {
            fontSize: '48px',
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

        // Audio Settings
        const audioText = this.add.text(centerX, centerY - 150, 'Audio Settings', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        const audioOnButton = this.add.text(centerX - 100, centerY - 100, 'On', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => audioOnButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => audioOnButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setAudio(true));

        const audioOffButton = this.add.text(centerX + 100, centerY - 100, 'Off', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => audioOffButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => audioOffButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setAudio(false));

        // Graphics Settings
        const graphicsText = this.add.text(centerX, centerY - 50, 'Graphics Settings', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        const highGraphicsButton = this.add.text(centerX - 100, centerY, 'High', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => highGraphicsButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => highGraphicsButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setGraphics('high'));

        const lowGraphicsButton = this.add.text(centerX + 100, centerY, 'Low', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => lowGraphicsButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => lowGraphicsButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setGraphics('low'));

        // Controls Settings
        const controlsText = this.add.text(centerX, centerY + 50, 'Control Settings', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        const controlSchemeAButton = this.add.text(centerX - 100, centerY + 100, 'Scheme A', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => controlSchemeAButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => controlSchemeAButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setControls('A'));

        const controlSchemeBButton = this.add.text(centerX + 100, centerY + 100, 'Scheme B', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => controlSchemeBButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => controlSchemeBButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => this.setControls('B'));

        // Back to Menu Button
        const backButton = this.add.text(centerX, centerY + 200, 'Back to Menu', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setInteractive({ useHandCursor: true })
        .on('pointerover', () => backButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => backButton.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => {
            this.scene.stop('SettingsScene');
            this.scene.resume('PauseMenuScene');
            this.scene.start('MainMenuScene');
        });
    }

    setAudio(isOn) {
        if (isOn) {
            this.sound.resumeAll();
        } else {
            this.sound.pauseAll();
        }
        console.log('Audio', isOn ? 'On' : 'Off');
    }

    setGraphics(level) {
        console.log('Graphics level:', level);
        // Update graphics settings in the game
    }

    setControls(scheme) {
        console.log('Control scheme:', scheme);
        // Update control settings in the game
    }
}

// Export the SettingsScene class
export default SettingsScene;
