# Canvas RAG Chat App - React Application

A beautiful, glass-morphism styled AI chat interface for Canvas LMS using Retrieval Augmented Generation (RAG).

## Quick Start

### Run the Development Server

```bash
cd react-app
npm run dev
```

Then open http://localhost:5173 in your browser.

## What's Been Set Up

### ✅ Completed

1. **React + Vite Project Structure**
   - Modern build tooling with Vite
   - Fast Hot Module Replacement (HMR)
   - Optimized for development

2. **Dependencies Installed**
   - `react-router-dom` - Client-side routing
   - `zustand` - Lightweight state management
   - `@tanstack/react-query` - Server state management
   - `axios` - HTTP client

3. **Component Architecture**
   - Comprehensive folder structure (see `/src/components/`)
   - Architecture documentation in `ARCHITECTURE.md`
   - Ready for scaling

4. **Migrated UI Components**
   - ✅ `ChatInput` - Your beautiful glass-morphism input
   - ✅ `WelcomeScreen` - "dictionary" landing page with input
   - ✅ `ChatInterface` - Main chat container (basic implementation)

5. **Global Styles**
   - ✅ CSS Variables system (`/src/styles/variables.css`)
   - ✅ Animation keyframes (`/src/styles/animations.css`)
   - ✅ Glass-morphism utilities (`/src/styles/global.css`)
   - ✅ Preserved your original aesthetic

6. **Routing Setup**
   - `/` - Main chat interface
   - `/chat` - Chat interface
   - `/chat/:conversationId` - Specific conversation (future)

## Current Features

### Working Now

- ✅ Beautiful welcome screen with "dictionary" title
- ✅ Glass-morphism text input with smooth animations
- ✅ Auto-resizing textarea
- ✅ Send button appears when text is entered
- ✅ Submit on Enter, new line on Shift+Enter
- ✅ Basic message display (simulated responses)
- ✅ Responsive design
- ✅ Dark mode support

### Demo Behavior

Currently, when you type a message:
1. It displays in a message bubble
2. A simulated AI response appears after 500ms
3. This is a placeholder - you'll replace it with your RAG backend

## Next Steps

### Phase 1: Complete Chat UI (Recommended Next)

1. **Create Message Components**
   ```bash
   # Files to create:
   src/components/chat/ChatMessage.jsx
   src/components/chat/MessageList.jsx
   src/components/chat/StreamingIndicator.jsx
   ```

2. **Add Source Citations**
   ```bash
   src/components/chat/SourceCitation.jsx
   ```

### Phase 2: Build Backend Integration

1. **Set up API Service**
   ```bash
   # Create these files:
   src/services/api.js          # Axios instance
   src/services/ragAPI.js       # RAG endpoints
   ```

2. **Example RAG API Call**
   ```javascript
   // In ragAPI.js
   import api from './api';

   export const sendQuery = async (query, courseIds) => {
     const response = await api.post('/api/chat/query', {
       query,
       courseIds,
       conversationId: null
     });
     return response.data;
   };
   ```

3. **Update ChatInterface to Use Real API**
   ```javascript
   // Replace the setTimeout simulation with:
   const response = await sendQuery(text, selectedCourses);
   ```

### Phase 3: Add State Management

1. **Create Zustand Stores**
   ```bash
   src/store/chatStore.js       # Conversation history
   src/store/authStore.js       # User authentication
   src/store/courseStore.js     # Course selection
   ```

2. **Example Chat Store**
   ```javascript
   // chatStore.js
   import { create } from 'zustand';

   export const useChatStore = create((set) => ({
     conversations: [],
     currentConversation: null,
     addMessage: (message) => set((state) => ({
       conversations: state.conversations.map(conv =>
         conv.id === state.currentConversation?.id
           ? { ...conv, messages: [...conv.messages, message] }
           : conv
       )
     })),
   }));
   ```

### Phase 4: Build Additional Pages

1. **Courses Page** - Select which courses to include
2. **History Page** - View past conversations
3. **Settings Page** - User preferences

### Phase 5: Canvas LMS Integration

1. **OAuth Authentication**
   ```bash
   src/components/auth/LoginPage.jsx
   src/components/auth/AuthCallback.jsx
   src/services/authService.js
   ```

2. **Canvas API Integration**
   ```bash
   src/services/canvasAPI.js
   ```

## Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── chat/                 # ✅ Chat components (started)
│   │   ├── courses/              # 🔲 Course selection (to build)
│   │   ├── sources/              # 🔲 Source display (to build)
│   │   ├── auth/                 # 🔲 Authentication (to build)
│   │   ├── layout/               # 🔲 App layout (to build)
│   │   └── common/               # 🔲 Reusable components (to build)
│   │
│   ├── pages/                    # 🔲 Page components (to build)
│   ├── hooks/                    # 🔲 Custom hooks (to build)
│   ├── store/                    # 🔲 Zustand stores (to build)
│   ├── services/                 # 🔲 API services (to build)
│   ├── utils/                    # 🔲 Utilities (to build)
│   │
│   ├── styles/
│   │   ├── global.css            # ✅ Global styles
│   │   ├── variables.css         # ✅ CSS custom properties
│   │   └── animations.css        # ✅ Animation keyframes
│   │
│   ├── App.jsx                   # ✅ Root component with router
│   └── main.jsx                  # ✅ Entry point
│
├── public/
│   └── images/
│       └── background.jpg        # ✅ Your background image
│
├── ARCHITECTURE.md               # ✅ Detailed architecture guide
├── package.json                  # ✅ Dependencies
└── README.md                     # ✅ This file
```

## Styling Guide

### Using CSS Variables

All design tokens are in `/src/styles/variables.css`:

```css
/* In your components */
.myComponent {
  color: var(--color-text-light);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  transition: all var(--transition-smooth);
}
```

### Glass-Morphism Classes

Use the built-in glass classes:

```jsx
<div className="glass-surface glass-surface--fallback">
  <div className="glass-surface__content">
    Your content here
  </div>
</div>
```

### Animation Classes

```jsx
<div className="animate-fade-up">Fades up on mount</div>
<div className="animate-slide-in-right">Slides in from right</div>
```

## CSS Modules

Components use CSS Modules for scoped styling:

```jsx
import styles from './MyComponent.module.css';

function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

## Development Tips

### Hot Reload
Changes to components auto-refresh in the browser instantly.

### Component Development
Create new components in their respective folders:
- Chat-related → `/src/components/chat/`
- Common/reusable → `/src/components/common/`

### Debugging
React DevTools browser extension is highly recommended.

### Code Organization
- Keep components small and focused
- Use custom hooks for shared logic
- Store complex state in Zustand stores

## Environment Variables

Create a `.env` file in `react-app/`:

```env
VITE_API_URL=http://localhost:8000
VITE_CANVAS_API_URL=https://your-canvas-instance.instructure.com/api/v1
VITE_CANVAS_CLIENT_ID=your_client_id
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Building for Production

```bash
npm run build
```

Output will be in `/react-app/dist/`

## Testing Your Current Setup

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **You should see:**
   - Beautiful "dictionary" title with animation
   - "ask anything." subtext
   - Glass-morphism input box
   - Background image with animated glow overlay

3. **Test the input:**
   - Type a message
   - Press Enter (or click send button)
   - See your message appear
   - See a simulated AI response

## Troubleshooting

### Background image not showing?
Make sure `public/images/background.jpg` exists.

### Styles not applying?
Check that `global.css` is imported in `App.jsx`.

### Router errors?
Ensure `react-router-dom` is installed: `npm install react-router-dom`

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query)

## Architecture Reference

See `ARCHITECTURE.md` for:
- Complete component breakdown
- Data flow diagrams
- State management strategy
- API integration patterns
- Future enhancements

---

**Ready to start building!** 🚀

Your beautiful UI is now in React and ready to be connected to a RAG backend.
