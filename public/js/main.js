// Main game logic
import BootScene from '../BootScene.js';
import MainMenuScene from './MainMenuScene.js';
import { handleError } from './errorHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized');

    const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        parent: 'gameContainer',
        scene: [BootScene, MainMenuScene],
        backgroundColor: '#000000'
    };

    try {
        const game = new Phaser.Game(config);
    } catch (error) {
        handleError(error, /* specify line number if possible */);
    }
});





