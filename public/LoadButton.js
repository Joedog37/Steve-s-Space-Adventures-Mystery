export default function createLoadButton(scene, centerX, centerY) {
    const loadButton = scene.add.text(centerX, centerY, 'Load Game', {
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
    .on('pointerover', () => loadButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => loadButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => {
        scene.scene.start('SaveLoadScene');
    });
}
