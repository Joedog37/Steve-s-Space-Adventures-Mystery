// BootScene
import BackgroundManager from './BackgroundManager.js';
import AudioAssetManager from './AudioAssetManager.js';
import AudioManager from './AudioManager.js';

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
    this.backgroundManager = null;
    this.audioAssetManager = null;
    this.audioManager = null;
  }

  preload() {
    this.backgroundManager = new BackgroundManager(this);
    this.backgroundManager.preload('bootupBackground', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
    this.audioAssetManager = new AudioAssetManager(this);
    this.audioAssetManager.preload('bootupMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
    this.audioManager = new AudioManager(this);
    this.audioManager.preload();

    // Add loading text
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.loadingText = this.add.text(centerX, centerY, 'Loading...', {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.backgroundManager.create('bootupBackground', centerX, centerY);

    // Add title text
    const title = this.add.text(centerX, centerY - 50, "Welcome to Steve's Space Adventure Mystery", {
      fontSize: '64px',
      fill: '#ffffff'
    }).setOrigin(0.5);
    title.setAlpha(0);

    // Add subtitle text
    const subtitle = this.add.text(centerX, centerY + 50, "Embark on an epic journey through space!", {
      fontSize: '32px',
      fill: '#ffffff'
    }).setOrigin(0.5);
    subtitle.setAlpha(0);

    this.tweens.add({
      targets: [title, subtitle],
      alpha: 1,
      duration: 2000,
      ease: 'Power2',
      delay: 1000 // Delay the title fade-in by 1 second
    });

    this.audioAssetManager.stopAll();
    this.audioAssetManager.play('bootupMusic', { loop: true });

    // Remove loading text after assets are loaded
    this.loadingText.destroy();
  }
}

export default BootScene;




