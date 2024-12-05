export default function createStartButton(scene, centerX, centerY) {
    const startButton = scene.add.text(centerX, centerY, 'Start Game', {
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
    .on('pointerdown', () => {
        scene.audioManager.stopAllMusic(); // Stop music before starting the game
        scene.cameras.main.fade(1500, 0, 0, 0);
        scene.time.delayedCall(1500, () => {
            scene.scene.start('IntroScene');
        });
    });
}
