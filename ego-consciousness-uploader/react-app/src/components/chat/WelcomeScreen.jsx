import ChatInput from './ChatInput';
import styles from './WelcomeScreen.module.css';

const WelcomeScreen = ({ onSend }) => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.title}>dictionary</h1>
      <p className={styles.subtext}>ask anything.</p>
      <div className={styles.inputContainer}>
        <ChatInput onSend={onSend} placeholder="How can I help you today?" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
