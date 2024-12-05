import Phaser from 'phaser';

// Initialize the game
async function initializeGame() {
    try {
        console.log('Initializing game...');
        await loadScript('https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/rosebud_AI_story_template_desktop_library.js?BzI8');
        console.log('External script loaded successfully');

        if (typeof Phaser === 'undefined') {
            throw new Error('Phaser not found after script load');
        }
        console.log('Phaser found');

        const scenes = [BootScene, MainMenuScene, IntroScene, StoryScene, CreditsScene, PauseMenuScene, SaveLoadScene, SettingsScene];
        console.log('Scenes to be added:', scenes.map(scene => scene.name));

        const config = {
            type: Phaser.AUTO,
            parent: 'renderDiv',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 1280,
                height: 720
            },
            scene: scenes,
            backgroundColor: '#000000',
            dom: {
                createContainer: true,
            },
            render: {
                pixelArt: false,
                antialias: true,
                roundPixels: false
            },
            audio: {
                disableWebAudio: false
            }
        };

        window.game = new Phaser.Game(config);
        console.log('Game instance created');

        window.game.events.once('ready', () => {
            console.log('Game is ready');
            window.game.scene.start('BootScene');
            console.log('BootScene started');
        });
    } catch (error) {
        console.error('Failed to initialize the Phaser game:', error);
        const errorElement = document.createElement('div');
        errorElement.textContent = 'An error occurred while loading the game. Please try refreshing the page.';
        errorElement.style.color = 'red';
        errorElement.style.padding = '20px';
        document.getElementById('renderDiv').appendChild(errorElement);
    }
}

// Initialize audio assets after defining addAudioAsset
addAudioAsset('BootScene', 'backgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
addAudioAsset('MainMenuScene', 'backgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
addAudioAsset('IntroScene', 'introSpeech', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Intro%20speech%20ai%20Andrew%20English.mp3?v=1733355860018');

initializeGame();
