import AudioAssetManager from './js/AudioAssetManager.js';
import AudioManager from './js/AudioManager.js';
import BackgroundManager from './BackgroundManager.js';

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

// Updated version number
const VERSION_NUMBER = 'v0.10.0';
const PROJECT_NAME = `Steve's Space Adventure Mystery AI Story ${VERSION_NUMBER}`;

function addAudioAsset(sceneName, assetKey, url) {
    if (typeof globalAudioAssetManager === 'undefined') {
        console.error('globalAudioAssetManager is not defined.');
        return;
    }

    globalAudioAssetManager.addAudioAsset(sceneName, assetKey, url);
    console.log(`Added audio asset '${assetKey}' to scene '${sceneName}'`);

    const creditInfo = prompt(`Please enter credit information for the audio asset '${assetKey}' (or press Cancel if not applicable):`);

    if (creditInfo) {
        const creditsScene = window.game.scene.getScene('CreditsScene');
        if (creditsScene) {
            creditsScene.addCreditInfo(assetKey, creditInfo);
        } else {
            console.warn('CreditsScene not found. Credit information will not be added.');
        }
    }
}

// Example usage of AudioAssetManager, AudioManager, and BackgroundManager
const audioManager = new AudioManager();
audioManager.addAudioAsset('BootScene', 'backgroundMusic', 'path/to/music.mp3');

const backgroundManager = new BackgroundManager();
backgroundManager.preload('backgroundKey', 'path/to/background.png');

console.log(audioManager.getAudioAsset('BootScene', 'backgroundMusic'));

