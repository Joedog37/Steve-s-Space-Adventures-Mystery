import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';
//EpisodeSelectionScene//
class EpisodeSelectionScene extends Phaser.Scene {
    constructor() {
        super('EpisodeSelectionScene');
    }

    preload() {
        this.load.image('episode1', 'path/to/episode1_thumbnail.png');
        this.load.image('episode2', 'path/to/episode2_thumbnail.png');
        this.load.image('background', 'path/to/background_image.png');
    }

    create() {
        this.add.image(400, 300, 'background'); // Adjust coordinates as needed

        const episodes = [
            { key: 'episode1', title: 'Episode 1: The Beginning', description: 'Start your adventure here.' },
            { key: 'episode2', title: 'Episode 2: The Journey Continues', description: 'Continue your quest.' }
        ];

        episodes.forEach((episode, index) => {
            const x = 200 + (index * 300); // Adjust spacing as needed
            const y = 300;

            const episodeThumbnail = this.add.image(x, y, episode.key).setInteractive();
            episodeThumbnail.on('pointerdown', () => {
                this.startEpisode(episode.key);
            });

            this.add.text(x, y + 100, episode.title, { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
            this.add.text(x, y + 130, episode.description, { fontSize: '16px', fill: '#ffffff' }).setOrigin(0.5);

            // Add a border or highlight to the selected episode
            episodeThumbnail.on('pointerover', () => {
                episodeThumbnail.setTint(0x00ff00); // Change color on hover
            });
            episodeThumbnail.on('pointerout', () => {
                episodeThumbnail.clearTint(); // Reset color when not hovering
            });
        });

        // Add navigation arrows if needed
        const leftArrow = this.add.text(50, 300, '<', { fontSize: '48px', fill: '#ffffff' }).setInteractive();
        const rightArrow = this.add.text(750, 300, '>', { fontSize: '48px', fill: '#ffffff' }).setInteractive();

        leftArrow.on('pointerdown', () => {
            // Logic to navigate to the previous set of episodes
        });

        rightArrow.on('pointerdown', () => {
            // Logic to navigate to the next set of episodes
        });
    }

    startEpisode(episodeKey) {
        this.scene.start(episodeKey);
    }
}

export default EpisodeSelectionScene;
