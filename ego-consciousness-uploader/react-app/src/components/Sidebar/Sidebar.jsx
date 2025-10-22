import { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCanvasLogin = () => {
    // TODO: Implement Canvas OAuth flow
    console.log('Initiating Canvas OAuth login...');
    // This will eventually redirect to Canvas OAuth endpoint
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div className={styles.sidebarContent}>
        {!isCollapsed && (
          <>
            <div className={styles.header}>
              <h2>Menu</h2>
            </div>

            <div className={styles.section}>
              <button
                className={styles.canvasLoginButton}
                onClick={handleCanvasLogin}
              >
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Canvas OAuth Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
