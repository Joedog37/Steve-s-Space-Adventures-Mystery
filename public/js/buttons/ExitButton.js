export default function createExitButton(scene, centerX, centerY) {
    const exitButton = scene.add.text(centerX, centerY, 'Exit Game', {
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
    .on('pointerdown', () => {
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
    });
}
