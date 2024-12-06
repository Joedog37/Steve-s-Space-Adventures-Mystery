// --------------------------------- // AudioManager // --------------------------------- //
class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.audioAssets = {};
    }

    loadAudio() {
        // Load audio assets
        for (const [key, url] of Object.entries(this.audioAssets)) {
            this.scene.load.audio(key, url);
        }
    }

    addAudioAsset(key, url) {
        if (typeof url !== 'string') {
            console.error(`Invalid URL for audio asset '${key}':`, url);
            return;
        }
        this.audioAssets[key] = url;
    }

    playBackgroundMusic(key, fadeInDuration = 0) {
        if (this.scene.sound.get(key)) {
            this.scene.sound.stopAll();
        }
        const music = this.scene.sound.add(key, { loop: true });
        music.play({ volume: 0 });
        this.scene.tweens.add({
            targets: music,
            volume: 1,
            duration: fadeInDuration,
            ease: 'Linear'
        });
    }

    stopAllMusic() {
        this.scene.sound.stopAll();
    }

    fadeOutAll(fadeOutDuration = 0) {
        this.scene.tweens.add({
            targets: this.scene.sound.getAll(),
            volume: 0,
            duration: fadeOutDuration,
            ease: 'Linear',
            onComplete: () => {
                this.stopAllMusic();
            }
        });
    }
}

export default AudioManager;

