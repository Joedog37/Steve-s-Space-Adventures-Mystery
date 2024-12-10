import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';
import SaveManager from './SaveManager.js';

class SaveMenuScene extends Phaser.Scene {
    constructor() {
        super('SaveMenuScene');
    }

    preload() {
        console.log('SaveMenuScene: preload started');
        this.audioManager = new AudioManager(this);
        this.audioManager.loadAudio();
        this.load.image('backgroundSave', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/SaveBack.png?v=1733615826069'); // Load background image
        this.load.image('popup', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/save.png?v=1733678854769'); // Load pop-up image
        this.load.image('autoSaveIcon', 'https://cdn.glitch.global/c677e889-faf8-4d6d-99af-3bcd7b640617/floppy-disc.gif?v=1733780136985'); // Load auto-save icon
        console.log('SaveMenuScene: preload completed');
    }

    create() {
        console.log('SaveMenuScene: create started');
        this.children.removeAll();

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        // Add background image
        const background = this.add.image(centerX, centerY, 'backgroundSave').setOrigin(0.5);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Ensure the image is scaled to fit the screen

        // Add text elements with precise coordinates
        this.add.text(960, 30, 'Scene Menu', { fontSize: '36px', fill: '#ffffff' }).setOrigin(0.5, 0);
        this.add.text(401, 140, 'Select Scene', { fontSize: '36px', fill: '#ffffff' });

        // Add interactive save slots
        this.createSaveSlot(401, 290, 'Save Slot 1', 'Ep. 1', 1);
        this.createSaveSlot(401, 590, 'Save Slot 2', 'Ep. 2', 2);
        this.createSaveSlot(401, 900, 'Save Slot 3', 'Ep. 3', 3);

        this.add.text(1450, 260, 'Save', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.saveSlot(1));
        this.add.text(1385, 370, 'Load/Delete', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showLoadDeleteOptions(1));
        this.add.text(1450, 550, 'Save', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.saveSlot(2));
        this.add.text(1385, 660, 'Load/Delete', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showLoadDeleteOptions(2));
        this.add.text(1450, 840, 'Save', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.saveSlot(3));
        this.add.text(1385, 950, 'Load/Delete', { fontSize: '36px', fill: '#ffffff' }).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showLoadDeleteOptions(3));

        // Create pop-up but keep it hidden initially
        this.popup = this.add.image(centerX, centerY, 'popup').setOrigin(0.5).setVisible(false);
        this.popupText = this.add.text(centerX, centerY - 50, 'Do you want to load from the save point of the game or do you want to delete the save file?', { fontSize: '24px', fill: '#ffffff', wordWrap: { width: 400, useAdvancedWrap: true } }).setOrigin(0.5).setVisible(false);

        // Create Load and Delete buttons on the pop-up with new positions
        this.loadButton = this.add.text(centerX - 190, centerY + 100, 'Load', { fontSize: '36px', fill: '#ffffff' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => this.loadSlot(this.currentSlot));

        this.deleteButton = this.add.text(centerX + 100, centerY + 100, 'Delete', { fontSize: '36px', fill: '#ffffff' })
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => this.deleteSlot(this.currentSlot));

        // Add ESC key functionality to pause the game
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseMenuScene');
        });

        console.log('SaveMenuScene: create completed');

        // Automatically load the save data from local storage
        this.loadFromLocalStorage();

        // Show the auto-save icon
        const autoSaveIcon = this.add.image(this.cameras.main.width - 50, 50, 'autoSaveIcon').setOrigin(0.5);
        autoSaveIcon.setDisplaySize(32, 32); // Adjust the size as needed
        autoSaveIcon.setAlpha(0); // Set initial alpha to 0 for fade-in effect
        this.tweens.add({
            targets: autoSaveIcon,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });
    }

    createSaveSlot(x, y, defaultText, episodeName, slotNumber) {
        const savedText = localStorage.getItem(`saveSlot${slotNumber}`) || defaultText;
        const saveSlotText = this.add.text(x, y, savedText, { fontSize: '36px', fill: '#ffffff' });
        saveSlotText.episodeName = episodeName;
        saveSlotText.slotNumber = slotNumber;
    }

    saveSlot(slotNumber) {
        const saveSlotText = this.children.list.find(child => child.slotNumber === slotNumber);
        if (saveSlotText) {
            const currentDate = new Date().toLocaleDateString(); // Just include date
            const newText = `${saveSlotText.episodeName} - ${currentDate}`;
            saveSlotText.setText(newText);
            const success = SaveManager.saveGame(`saveSlot${slotNumber}`, { episode: saveSlotText.episodeName, date: currentDate, scene: this.scene.key, gender: localStorage.getItem('gender') });
            if (!success) {
                this.showErrorMessage('Error saving game. Please try again.');
            } else {
                this.scene.start('EpisodeSelectionScene'); // Progress to the next scene
            }
        }
    }

    showLoadDeleteOptions(slotNumber) {
        this.currentSlot = slotNumber;
        this.popup.setVisible(true);
        this.popupText.setVisible(true);
        this.loadButton.setVisible(true);
        this.deleteButton.setVisible(true);
    }

    loadSlot(slotNumber) {
        console.log(`Loading save slot ${slotNumber}`);
        const savedState = SaveManager.loadGame(`saveSlot${slotNumber}`);
        if (savedState) {
            console.log('Loaded state:', savedState);
            // Restore the game state based on the saved data
            localStorage.setItem('gender', savedState.gender); // Restore gender
            this.scene.start(savedState.scene); // Progress to the saved scene
        } else {
            this.showErrorMessage('Error loading game. Please try again.');
        }
        this.hidePopup();
    }

    deleteSlot(slotNumber) {
        const saveSlotText = this.children.list.find(child => child.slotNumber === slotNumber);
        if (saveSlotText) {
            const defaultText = `Save Slot ${slotNumber}`;
            saveSlotText.setText(defaultText);
            SaveManager.deleteGame(`saveSlot${slotNumber}`);
            console.log(`Deleted save slot ${slotNumber}`);
        }
        this.hidePopup();
    }

    hidePopup() {
        this.popup.setVisible(false);
        this.popupText.setVisible(false);
        this.loadButton.setVisible(false);
        this.deleteButton.setVisible(false);
    }

    loadFromLocalStorage() {
        const saveData = {
            saveSlot1: localStorage.getItem('saveSlot1') || 'Save Slot 1',
            saveSlot2: localStorage.getItem('saveSlot2') || 'Save Slot 2',
            saveSlot3: localStorage.getItem('saveSlot3') || 'Save Slot 3'
        };
        this.restoreGameState(saveData); // Restore the game state
    }

    restoreGameState(saveData) {
        // Restore the game state based on the save data
        console.log('Restoring game state:', saveData);
        // Add your game state restoration logic here
    }

    showErrorMessage(message) {
        const errorMessage = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, message, { fontSize: '24px', fill: '#ff0000' }).setOrigin(0.5);
        this.time.delayedCall(3000, () => {
            errorMessage.destroy();
        });
    }
}

export default SaveMenuScene;



























