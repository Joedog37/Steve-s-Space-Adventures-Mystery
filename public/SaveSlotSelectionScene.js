import BackgroundManager from './BackgroundManager.js';
import AudioManager from './AudioManager.js';
//SaveSlotSelectionScene//
class SaveSlotSelectionScene extends Phaser.Scene {
    constructor() {
        super('SaveSlotSelectionScene');
    }

    preload() {
        this.load.image('background', 'path/to/background_image.png');
    }

    create() {
        this.add.image(400, 300, 'background'); // Adjust coordinates as needed

        const saveSlots = [
            { key: 'save1', name: localStorage.getItem('save1_name') || 'Empty Slot' },
            { key: 'save2', name: localStorage.getItem('save2_name') || 'Empty Slot' },
            { key: 'save3', name: localStorage.getItem('save3_name') || 'Empty Slot' },
            { key: 'save4', name: localStorage.getItem('save4_name') || 'Empty Slot' }
        ];

        saveSlots.forEach((slot, index) => {
            const x = 400;
            const y = 150 + (index * 100);

            const slotText = this.add.text(x, y, slot.name, { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
            slotText.setInteractive();

            slotText.on('pointerdown', () => {
                this.selectSaveSlot(slot.key);
            });
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            const selectedSlot = saveSlots.find(slot => slot.selected);
            if (selectedSlot) {
                this.startGame(selectedSlot.key);
            }
        });
    }

    selectSaveSlot(slotKey) {
        const saveName = prompt('Enter save name:');
        if (saveName) {
            localStorage.setItem(`${slotKey}_name`, saveName);
            localStorage.setItem(`${slotKey}_progress`, JSON.stringify({ episode: 'EpisodeSelectionScene', data: {} }));
            this.scene.start('EpisodeSelectionScene');
        }
    }

    startGame(slotKey) {
        const saveData = JSON.parse(localStorage.getItem(`${slotKey}_progress`));
        if (saveData) {
            this.scene.start(saveData.episode, saveData.data);
        } else {
            this.scene.start('EpisodeSelectionScene');
        }
    }
}

export default SaveSlotSelectionScene;
