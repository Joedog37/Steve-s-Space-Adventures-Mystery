class SaveManager {
    static saveGame(slotName, gameState) {
        try {
            localStorage.setItem(slotName, JSON.stringify(gameState));
            console.log(`Game saved in slot: ${slotName}`);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    static loadGame(slotName) {
        try {
            const savedState = JSON.parse(localStorage.getItem(slotName));
            if (savedState) {
                console.log(`Game loaded from slot: ${slotName}`);
                return savedState;
            } else {
                console.log(`No saved game found in slot: ${slotName}`);
                return null;
            }
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    static deleteGame(slotName) {
        try {
            localStorage.removeItem(slotName);
            console.log(`Game deleted from slot: ${slotName}`);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    static getSaveSlots() {
        const slots = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            slots.push(key);
        }
        return slots;
    }

    static loadAllGames() {
        const allGames = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allGames[key] = JSON.parse(localStorage.getItem(key));
        }
        console.log('All games loaded:', allGames);
        return allGames;
    }
}

export default SaveManager;
