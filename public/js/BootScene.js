class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('background', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const background = this.add.image(centerX, centerY, 'background').setOrigin(0.5);
        background.setAlpha(0);

        this.tweens.add({
            targets: background,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

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
    }
}

export default BootScene;
