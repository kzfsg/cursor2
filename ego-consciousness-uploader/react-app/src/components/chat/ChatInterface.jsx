import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import ChatInput from './ChatInput';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    console.log('Message sent:', text);

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // TODO: Call RAG API here
    // For now, just simulate a response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `You asked: "${text}". This is where the AI response will appear once we connect the RAG backend.`,
        timestamp: new Date(),
        sources: []
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <div className={styles.chatContainer}>
      {messages.length === 0 ? (
        <WelcomeScreen onSend={handleSend} />
      ) : (
        <>
          <div className={styles.messagesWrapper}>
            <div className={styles.messagesList}>
              {messages.map(message => (
                <div key={message.id} style={{
                  padding: '1rem',
                  background: message.type === 'user'
                    ? 'rgba(102, 126, 234, 0.2)'
                    : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  backdropFilter: 'blur(10px)',
                  color: 'white'
                }}>
                  <strong>{message.type === 'user' ? 'You' : 'AI'}:</strong>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.inputSection}>
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <ChatInput onSend={handleSend} placeholder="Ask a follow-up question..." />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
