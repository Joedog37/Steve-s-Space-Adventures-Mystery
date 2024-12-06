// --------------------------------- // AudioManager // --------------------------------- //
class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.backgroundMusic = null;
        this.settingsMusic = null;
        this.introSpeech = null;
        this.musicVolume = 1;
        this.soundVolume = 1;
        this.voiceVolume = 1;
        this.sounds = {};
        this.playingSounds = {}; // Track currently playing sounds
    }

    loadAudio() {
        const sceneAudioAssets = this.scene.cache.audio.entries.entries;
        for (const [key, url] of Object.entries(sceneAudioAssets)) {
            this.scene.load.audio(key, url);
        }
    }

    playBackgroundMusic(key, fadeInDuration = 1000) {
        this.stopAllMusic();
        if (this.scene.cache.audio.exists(key)) {
            this.backgroundMusic = this.scene.sound.add(key, { loop: true, volume: 0 });
            this.playingSounds[key] = this.backgroundMusic;
            this.backgroundMusic.play();
            this.scene.tweens.add({
                targets: this.backgroundMusic,
                volume: this.musicVolume,
                duration: fadeInDuration,
                ease: 'Linear'
            });
            console.log(`Background music ${key} started with fade-in`);
        } else {
            console.error(`Background music ${key} not found in the audio cache`);
        }
    }

    playIntroSpeech(key, fadeInDuration = 1000) {
        if (this.introSpeech) {
            this.introSpeech.stop();
        }
        if (this.scene.cache.audio.exists(key)) {
            this.introSpeech = this.scene.sound.add(key, { loop: false, volume: 0 });
            this.playingSounds[key] = this.introSpeech;
            this.introSpeech.play();
            this.scene.tweens.add({
                targets: this.introSpeech,
                volume: this.voiceVolume,
                duration: fadeInDuration,
                ease: 'Linear'
            });
            console.log(`Intro speech ${key} started with fade-in`);
            return this.introSpeech;
        } else {
            console.error(`Intro speech ${key} not found in the audio cache`);
            return null;
        }
    }

    fadeOutAll(duration = 1000) {
        return new Promise((resolve) => {
            const fadeTweens = [];
            for (const key in this.playingSounds) {
                const sound = this.playingSounds[key];
                if (sound && sound.isPlaying) {
                    fadeTweens.push(
                        this.scene.tweens.add({
                            targets: sound,
                            volume: 0,
                            duration: duration,
                            ease: 'Linear'
                        })
                    );
                }
            }

            if (fadeTweens.length > 0) {
                this.scene.tweens.add({
                    targets: {},
                    duration: duration,
                    onComplete: () => {
                        this.stopAll();
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    stopAllMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            this.backgroundMusic = null;
        }
        if (this.settingsMusic) {
            this.settingsMusic.stop();
            this.settingsMusic = null;
        }
        console.log('All music stopped');
    }

    stopAll() {
        for (const key in this.playingSounds) {
            const sound = this.playingSounds[key];
            if (sound) {
                sound.stop();
            }
        }
        this.playingSounds = {};
        console.log('All audio stopped');
    }
}

// Export the AudioManager class
export default AudioManager;
