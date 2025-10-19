// Dictionary AI Assistant Application

let isInChatMode = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, setting up application...');
  setupInitialLayout();
  setupChatLayout();
});

function setupInitialLayout() {
  const textInput = document.getElementById('text-input');
  
  if (textInput) {
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleInitialSubmit();
      }
    });
    
    console.log('Initial text input listener added');
  }
}

function setupChatLayout() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.querySelector('.send-btn');

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleChatSubmit();
      }
    });
    
    console.log('Chat input listener added');
  }
  
  if (sendBtn) {
    sendBtn.addEventListener('click', handleChatSubmit);
    console.log('Send button listener added');
  }
}

function handleInitialSubmit() {
  const textInput = document.getElementById('text-input');
  const text = textInput.value.trim();
  
  if (text) {
    console.log('Initial text submitted:', text);
    
    // Switch to chat layout
    switchToChatLayout();
    
    // Add the initial message to chat
    addMessageToChat('user', text);
    
    // Simulate AI response
    setTimeout(() => {
      addMessageToChat('assistant', `I understand you're asking about "${text}". How can I help you further?`);
    }, 1000);
  }
}

function handleChatSubmit() {
  const chatInput = document.getElementById('chat-input');
  const text = chatInput.value.trim();
  
  if (text) {
    console.log('Chat message submitted:', text);
    
    // Add user message to chat
    addMessageToChat('user', text);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me think about that...",
        "I can help you with that. Here's what I think:",
        "Great question! Based on what you've told me:",
        "I understand. Let me provide some insights:",
        "That's a good point. Here's my perspective:"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessageToChat('assistant', randomResponse);
    }, 1500);
  }
}

function switchToChatLayout() {
  const initialLayout = document.getElementById('initial-layout');
  const chatLayout = document.getElementById('chat-layout');
  
  if (initialLayout && chatLayout) {
    initialLayout.classList.add('hidden');
    chatLayout.classList.remove('hidden');
    isInChatMode = true;
    
    // Focus on chat input
    setTimeout(() => {
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
        chatInput.focus();
      }
    }, 100);
  }
}

function addMessageToChat(role, content) {
  const messagesContainer = document.getElementById('chat-messages');
  
  if (messagesContainer) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;

  messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 10);
  }
}

// Handle sidebar interactions
document.addEventListener('DOMContentLoaded', () => {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      sidebarItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
    });
  });
});
