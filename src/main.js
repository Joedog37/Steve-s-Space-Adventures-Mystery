import AudioAssetManager from './AudioAssetManager.js';

//////////////////////////////////////////////////////////////
// EASY-MODIFY SECTION
// UPDATE VALUES IN THIS SECTION TO EASILY MODIFY GAME

// Your chatbot's name
// NOTE: Every new name for a chatbot creates a new save slot for the chat history.
const STORY_NAME = "Steve's Space Adventure Mystery";

// This is information for the AI to understand how to behave. 
// If you want to change the story please change STORY_DESCRIPTION.
const NARRATOR_BEHAVIOUR_GUIDE = `
- You are the external narrator of an expertly written story.
- Speak as though you are an eloquent narrator that can draw in any reader. 
- Speak in a way like this: "You arrive. What do you do next?"
- You are an external narrator and are not inside the story.
- Guide the story so it stays on track and make the player's actions fit. 
- Keep your messages short.
- End your messages with an action the player can take (e.g. "What do you do?", "What do you say?")
`;

// END OF EASY-MODIFY VALUES
//////////////////////////////////////////////////////////////

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
const PROJECT_NAME = `${STORY_NAME} AI Story ${VERSION_NUMBER}`;

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

// Example usage of AudioAssetManager
const audioManager = new AudioAssetManager();
audioManager.addAudioAsset('BootScene', 'backgroundMusic', 'path/to/music.mp3');

console.log(audioManager.getAudioAsset('BootScene', 'backgroundMusic'));
