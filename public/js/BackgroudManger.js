// BackgroundManager
class BackgroundManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload(key, url) {
        this.scene.load.image(key, url);
    }

    create(key, centerX, centerY) {
        const background = this.scene.add.image(centerX, centerY, key).setOrigin(0.5);
        background.setDisplaySize(this.scene.cameras.main.width, this.scene.cameras.main.height);
        background.setAlpha(0);

        this.scene.tweens.add({
            targets: background,
            alpha: 1,
            duration: 2000,
            ease: 'Power2'
        });

        return background;
    }
}

export default BackgroundManager;

