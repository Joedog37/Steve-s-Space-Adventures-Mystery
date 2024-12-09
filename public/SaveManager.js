class SaveManager {
    static saveGame(slotName, gameState) {
        try {
            localStorage.setItem(slotName, JSON.stringify(gameState));
            console.log(`Game saved in slot: ${slotName}`);
        } catch (error) {
            console.error('Error saving data:', error);
            return false; // Indicate that the save operation failed
        }
        return true; // Indicate that the save operation succeeded
    }

    static loadGame(slotName) {
        try {
            const savedState = localStorage.getItem(slotName);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                console.log(`Game loaded from slot: ${slotName}`);
                return parsedState;
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
            try {
                allGames[key] = JSON.parse(localStorage.getItem(key));
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        }
        console.log('All games loaded:', allGames);
        return allGames;
    }
}

export default SaveManager;


