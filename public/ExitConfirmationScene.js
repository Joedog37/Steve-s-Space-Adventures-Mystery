class ExitConfirmationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExitConfirmationScene' });
    }

    preload() {
        // No audio to load in this scene
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.fadeIn(1500);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const box = this.add.rectangle(centerX, centerY, 400, 200, 0x000000, 0.8);
        box.setStrokeStyle(2, 0xff0000);

        const text = this.add.text(centerX, centerY - 50, "Are you sure you want to exit the game?\nAny unsaved data will be lost.", {
            fontSize: '24px',
            fill: '#ff0000',
            align: 'center',
            wordWrap: {
                width: 380
            }
        }).setOrigin(0.5);

        const yesButton = this.add.text(centerX - 100, centerY + 50, 'Yes', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#ff0000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0.5).setInteractive();

        const noButton = this.add.text(centerX + 100, centerY + 50, 'No', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#ff0000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0.5).setInteractive();

        yesButton.on('pointerup', () => {
            box.destroy();
            text.destroy();
            yesButton.destroy();
            noButton.destroy();

            const safeText = this.add.text(centerX, centerY, "It's safe to close the tab or your browser.", {
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                wordWrap: {
                    width: 380
                }
            }).setOrigin(0.5);

            this.cameras.main.fadeOut(1500, 0, 0, 0);
        });

        noButton.on('pointerup', () => {
            this.cameras.main.fadeOut(1500, 0, 0, 0);
            this.time.delayedCall(1500, () => {
                if (this.scene.get('MainMenuScene').isActive()) {
                    this.scene.start('MainMenuScene');
                } else {
                    this.scene.start('PauseMenuScene');
                }
            });
        });
    }
}

export default ExitConfirmationScene;


