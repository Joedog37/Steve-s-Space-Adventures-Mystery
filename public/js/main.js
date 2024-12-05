// Main game logic
import BootScene from './js/BootScene.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized');

    const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: 'gameContainer',
        scene: [BootScene],
        backgroundColor: '#000000'
    };

    const game = new Phaser.Game(config);
});
