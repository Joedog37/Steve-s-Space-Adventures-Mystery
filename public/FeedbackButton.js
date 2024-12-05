export default function createFeedbackButton(scene, centerX, centerY) {
    const feedbackButton = scene.add.text(centerX, centerY, 'Feedback', {
        fontSize: '36px',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        shadow: {
            offsetX: 2,
            offsetY: 2,
            color: '#000000',
            blur: 3,
            stroke: true,
            fill: true
        }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => feedbackButton.setStyle({ fill: '#ff0' }))
    .on('pointerout', () => feedbackButton.setStyle({ fill: '#ffffff' }))
    .on('pointerdown', () => {
        // Create an HTML form element
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'your-server-endpoint'); // Replace with your server endpoint

        // Create a textarea for feedback
        const textarea = document.createElement('textarea');
        textarea.setAttribute('name', 'feedback');
        textarea.setAttribute('rows', '10');
        textarea.setAttribute('cols', '30');
        textarea.setAttribute('placeholder', 'Enter your feedback here...');

        // Create a submit button
        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit Feedback');

        // Append elements to the form
        form.appendChild(textarea);
        form.appendChild(submitButton);

        // Append the form to the document body
        document.body.appendChild(form);

        // Focus on the textarea
        textarea.focus();
    });
}
