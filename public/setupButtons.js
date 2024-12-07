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

    // Remove Load Game Button and its functionality
    // const loadButton = scene.add.text(centerX, startButton.y + startButton.height + 20, 'Load Game', {
    //     fontSize: '36px',
    //     fill: '#ffffff',
    //     stroke: '#000000',
    //     strokeThickness: 6,
    //     shadow: {
    //         offsetX: 2,
    //         offsetY: 2,
    //         color: '#000000',
    //         blur: 3,
    //         stroke: true,
    //         fill: true
    //     }
    // }).setOrigin(0.5)
    // .setInteractive({ useHandCursor: true })
    // .on('pointerover', () => loadButton.setStyle({ fill: '#ff0' }))
    // .on('pointerout', () => loadButton.setStyle({ fill: '#ffffff' }))
    // .on('pointerdown', () => scene.loadGame());

    // scene.loadGame = function() {
    //     scene.scene.start('SaveLoadScene');
    // };

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
    .on('pointerdown', () => scene.promptFeedback());

    scene.promptFeedback = function() {
        // Create an HTML form element
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'your-server-endpoint'); // Replace with your server endpoint

        // Create a textarea for feedback
        const textarea = document.createElement('textarea');
        textarea.setAttribute('name', 'feedback');
        textarea.setAttribute('rows', '10');
        textarea.setAttribute('cols', '30');
        textarea.setAttribute('placeholder', 'Enter your feedback here...');

        // Create a submit button
        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit Feedback');

        // Append elements to the form
        form.appendChild(textarea);
        form.appendChild(submitButton);

        // Append the form to the document body
        document.body.appendChild(form);

        // Focus on the textarea
        textarea.focus();
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
    .on('pointerdown', () => scene.showExitMessage());

    scene.showExitMessage = function() {
        const message = scene.add.text(scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'Please manually close the tab or browser to exit the game.', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            align: 'center',
            wordWrap: {
                width: scene.cameras.main.width - 50
            }
        }).setOrigin(0.5).setAlpha(0);

        scene.tweens.add({
            targets: message,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

        scene.time.delayedCall(5000, () => {
            scene.tweens.add({
                targets: message,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    message.destroy();
                }
            });
        });
    };
}



