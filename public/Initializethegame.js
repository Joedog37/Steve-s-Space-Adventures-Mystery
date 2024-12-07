import AudioManager from './AudioManager.js';
import BackgroundManager from './BackgroundManager.js';
import BootScene from './BootScene.js';
import MainMenuScene from './MainMenuScene.js';
import Prologue from './Prologue.js';

// Define STORY_NAME and other constants
const STORY_NAME = "Steve's Space Adventure Mystery";
const VERSION_NUMBER = 'v0.11.0-alpha';
const PROJECT_NAME = `${STORY_NAME} AI Story ${VERSION_NUMBER}`;

// Custom error handler for debugging
function handleError(error, lineNumber) {
    console.error(`Error on line ${lineNumber}: ${error.message}`);
    console.error(error.stack);
}

// Wrap the entire game initialization in a try-catch block
try {
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve();
            script.onerror = (error) => {
                console.error('Error loading script:', error);
                reject(new Error('Script loading failed for ' + url));
            };
            document.head.appendChild(script);
        });
    }

    // More code here...

} catch (error) {
    handleError(error, /* specify line number if possible */);
}

function addAudioAsset(sceneName, assetKey, url) {
    if (typeof globalAudioAssetManager === 'undefined') {
        console.error('globalAudioAssetManager is not defined.');
        return;
    }

    globalAudioAssetManager.addAudioAsset(sceneName, assetKey, url);
    console.log(`Added audio asset '${assetKey}' to scene '${sceneName}'`);
}

// AudioAssetManager class
class AudioAssetManager {
    constructor() {
        this.audioAssets = {};
    }

    addAudioAsset(sceneName, assetKey, url) {
        if (!this.audioAssets[sceneName]) {
            this.audioAssets[sceneName] = {};
        }
        this.audioAssets[sceneName][assetKey] = url;
    }

    getAudioAsset(sceneName, assetKey) {
        return this.audioAssets[sceneName] && this.audioAssets[sceneName][assetKey];
    }

    getAllAudioAssetsForScene(sceneName) {
        return this.audioAssets[sceneName] || {};
    }

    removeAudioAsset(sceneName, assetKey) {
        if (this.audioAssets[sceneName] && this.audioAssets[sceneName][assetKey]) {
            delete this.audioAssets[sceneName][assetKey];
        }
    }

    listScenes() {
        return Object.keys(this.audioAssets);
    }

    listAudioAssetsForScene(sceneName) {
        return Object.keys(this.audioAssets[sceneName] || {});
    }
}

// Global instance of AudioAssetManager
const globalAudioAssetManager = new AudioAssetManager();

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

        const scenes = [BootScene, MainMenuScene, Prologue];
        console.log('Scenes to be added:', scenes.map(scene => scene.name));

        const config = {
            type: Phaser.AUTO,
            parent: 'renderDiv',
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 1920,
                height: 1080
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

// Function to load external scripts
function loadScript(url) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = (error) => {
            console.error('Error loading script:', error);
            reject(new Error('Script loading failed for ' + url));
        };
        document.head.appendChild(script);
    });
}

// Initialize audio assets after defining addAudioAsset
addAudioAsset('BootScene', 'backgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
addAudioAsset('MainMenuScene', 'backgroundMusic', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/space%20explorers.mp3?v=1733356315497');
addAudioAsset('IntroScene', 'introSpeech', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Intro%20speech%20ai%20Andrew%20English.mp3?v=1733355860018');
addAudioAsset('StoryScene', 'journeysEnd', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/Journey%27s%20End.mp3?v=1733356042450');
addAudioAsset('BootScene', 'bootupBackground', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/pexels-krisof-1252890.jpg?v=1733356421871');
addAudioAsset('CreditsScene', 'creditsBackground', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/AI%20art%20for%20credits%20scene%20background.png?v=1733356432906');

initializeGame();










