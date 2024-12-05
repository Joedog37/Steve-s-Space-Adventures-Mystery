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
