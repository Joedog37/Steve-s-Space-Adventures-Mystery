class BackgroundManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload(key, url) {
        if (!this.scene.textures.exists(key)) {
            this.scene.load.image(key, url);
        }
    }

    create(key, x, y) {
        return new Promise((resolve, reject) => {
            if (this.scene.textures.exists(key)) {
                const background = this.scene.add.image(x, y, key).setOrigin(0.5);
                resolve(background);
            } else {
                reject(new Error('Texture key not found'));
            }
        });
    }
}

export default BackgroundManager;
