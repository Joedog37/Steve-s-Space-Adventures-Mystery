export default function createCreditsButton(scene, centerX, centerY) {
    const creditsButton = scene.add.text(centerX, centerY, 'Credits', {
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
    .on('pointerdown', () => {
        scene.audioManager.stopAllMusic(); // Stop music before transitioning to credits
        scene.cameras.main.fade(1500, 0, 0, 0);
        scene.time.delayedCall(1500, () => {
            scene.scene.start('CreditsScene');
        });
    });
}
