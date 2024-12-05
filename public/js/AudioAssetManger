// AudioAssetManager
class AudioAssetManager {
    constructor(scene) {
        this.scene = scene;
        this.audioKeys = [];
    }

    preload(key, url) {
        this.scene.load.audio(key, url);
        this.audioKeys.push(key);
    }

    play(key, config = {}) {
        if (this.audioKeys.includes(key)) {
            const sound = this.scene.sound.add(key, config);
            sound.play();
            return sound;
        } else {
            console.warn(`Audio key "${key}" not found.`);
            return null;
        }
    }

    stopAll() {
        this.scene.sound.stopAll();
    }
}

export default AudioAssetManager;
