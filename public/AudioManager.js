// --------------------------------- // AudioManager // --------------------------------- //
class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.audioAssets = {};
        this.playingSounds = {};
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

    playIntroSpeech(key, fadeInDuration) {
        const sound = this.scene.sound.add(key);
        sound.play({ volume: 0 });
        this.scene.tweens.add({
            targets: sound,
            volume: 1,
            duration: fadeInDuration,
            ease: 'Linear'
        });
        this.playingSounds[key] = sound;
        return sound;
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
        this.playingSounds[key] = music;
        return music;
    }

    stopAllMusic() {
        this.scene.sound.stopAll();
    }

    fadeOutAll(fadeOutDuration = 0) {
        return new Promise((resolve) => {
            const sounds = Object.values(this.playingSounds);
            this.scene.tweens.add({
                targets: sounds,
                volume: 0,
                duration: fadeOutDuration,
                ease: 'Linear',
                onComplete: () => {
                    sounds.forEach(sound => sound.stop());
                    resolve();
                }
            });
        });
    }
}

export default AudioManager;


