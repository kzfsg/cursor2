// Dictionary - Simple Text Input Application

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, setting up text input...');
  setupTextInput();
});

function setupTextInput() {
  const textInput = document.getElementById('text-input');
  
  if (textInput) {
    // Add event listener for text input
    textInput.addEventListener('input', handleTextInput);
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleTextSubmit();
      }
    });
    
    console.log('Text input listener added');
  }
}

function handleTextInput(event) {
  const text = event.target.value;
  console.log('Text input:', text);
  
  // You can add any real-time processing here
  // For example, character count, validation, etc.
}

function handleTextSubmit() {
  const textInput = document.getElementById('text-input');
  const text = textInput.value.trim();
  
  if (text) {
    console.log('Text submitted:', text);
    
    // You can add processing logic here
    // For example, save to localStorage, send to an API, etc.
    
    // For now, just show an alert
    alert(`You entered: "${text}"`);
    
    // Clear the input
    textInput.value = '';
  }
}