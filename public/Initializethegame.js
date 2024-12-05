// Initialize the game
async function initializeGame() {
    try {
        console.log('Initializing game...');
        await loadScript('https://play.rosebud.ai/assets/rosebud_AI_story_template_desktop_library.js.js?BzI8');
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

        // Main game logic
import { handleError, loadScript } from '../js/errorHandler.js';

// Initialize the game
async function initializeGame() {
    try {
        console.log('Initializing game...');
        await loadScript('https://play.rosebud.ai/assets/rosebud_AI_story_template_desktop_library.js.js?BzI8');
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
addAudioAsset('BootScene', 'backgroundMusic', 'https://play.rosebud.ai/assets/space explorers.mp3?7jfX');
addAudioAsset('MainMenuScene', 'backgroundMusic', 'https://play.rosebud.ai/assets/space explorers.mp3?7jfX');
addAudioAsset('IntroScene', 'introSpeech', 'https://play.rosebud.ai/assets/Intro speech ai Andrew English.mp3?p0pf');

initializeGame();
