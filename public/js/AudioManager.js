class AudioManager {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.audio('bootupMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
    }

    playBackgroundMusic(key) {
        this.scene.sound.stopAll();
        const music = this.scene.sound.add(key, { loop: true });
        music.play();
    }
}

export default AudioManager;
