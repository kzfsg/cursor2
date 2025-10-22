import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/chat/ChatInterface';
import Sidebar from './components/Sidebar/Sidebar';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '280px', transition: 'margin-left 0.3s ease' }}>
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/chat/:conversationId" element={<ChatInterface />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
