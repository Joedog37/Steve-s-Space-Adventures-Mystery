//BootScene
import BackgroundManager from './js/BackgroundManager.js';
import AudioManager from './js/AudioManager.js';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
        this.backgroundManager = null;
        this.audioManager = null;
    }

    preload() {
        this.backgroundManager = new BackgroundManager(this);
        this.backgroundManager.preload('bootupBackground', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
        this.audioManager = new AudioManager(this);
        this.audioManager.preload();
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.backgroundManager.create('bootupBackground', centerX, centerY);

        const title = this.add.text(centerX, centerY, "Steve's Space Adventure Mystery", {
            fontSize: '64px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        title.setAlpha(0);

        this.tweens.add({
            targets: title,
            alpha: 1,
            duration: 2000,
            ease: 'Power2',
            delay: 1000 // Delay the title fade-in by 1 second
        });

        this.audioManager.playBackgroundMusic('bootupMusic');
    }
}

export default BootScene;

