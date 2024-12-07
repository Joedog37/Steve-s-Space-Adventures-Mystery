export function setupButtons(scene, centerX, startY) {
    // Add Start Game Button
    const startButton = scene.add.text(centerX, startY, 'Start Game', {
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
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => startButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => startButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => scene.startGame());

    scene.startGame = function() {
        scene.audioManager.stopAllMusic(); // Stop music before starting the game
        scene.cameras.main.fade(1500, 0, 0, 0);
        scene.time.delayedCall(1500, () => {
            scene.scene.start('Prologue');
        });
    };

    // Add Settings Button
    const settingsButton = scene.add.text(centerX, startButton.y + startButton.height + 20, 'Settings', {
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
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => settingsButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => settingsButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => scene.scene.start('SettingsScene'));

    // Add Credits Button
    const creditsButton = scene.add.text(centerX, settingsButton.y + settingsButton.height + 20, 'Credits', {
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
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => creditsButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => creditsButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => scene.transitionToCreditsScene());

    scene.transitionToCreditsScene = function() {
        scene.audioManager.stopAllMusic(); // Stop music before transitioning to credits
        scene.cameras.main.fade(1500, 0, 0, 0);
        scene.time.delayedCall(1500, () => {
            scene.scene.start('CreditsScene');
        });
    };

    // Add Feedback Button
    const feedbackButton = scene.add.text(centerX, creditsButton.y + creditsButton.height + 20, 'Feedback', {
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
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => feedbackButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => feedbackButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => scene.showEmail());

    scene.showEmail = function() {
        const emailText = this.add.text(centerX, centerY + 100, 'Send your feedback to: thunderheadpictures@gmail.com\nSubject: Game Feedback', {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center',
            wordWrap: {
                width: this.cameras.main.width - 50
            }
        }).setOrigin(0.5);

        this.time.delayedCall(10000, () => {
            emailText.destroy();
        });
    };

    // Add Exit Button
    const exitButton = scene.add.text(centerX, feedbackButton.y + feedbackButton.height + 20, 'Exit Game', {
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
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => exitButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => exitButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => scene.scene.start('ExitConfirmationScene'));
}




