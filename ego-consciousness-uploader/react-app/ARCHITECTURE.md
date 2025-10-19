# Canvas RAG Chat App - Component Architecture

## Overview
This is a React-based AI chat interface that uses RAG (Retrieval Augmented Generation) to answer questions based on Canvas LMS course content.

## Tech Stack
- **Frontend Framework**: React 18 + Vite
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight, simple)
- **API Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: CSS Modules + Global styles

## Component Architecture

### 1. App Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx          # Main app wrapper with sidebar
│   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   ├── Header.jsx              # Top header bar
│   │   └── Footer.jsx              # Footer (optional)
│   │
│   ├── chat/
│   │   ├── ChatInterface.jsx       # Main chat container
│   │   ├── ChatMessage.jsx         # Individual message bubble
│   │   ├── ChatInput.jsx           # Input component (migrated from original)
│   │   ├── MessageList.jsx         # Scrollable message list
│   │   ├── SourceCitation.jsx      # Shows sources for answers
│   │   ├── StreamingIndicator.jsx  # Shows when AI is responding
│   │   └── WelcomeScreen.jsx       # Initial screen before chat starts
│   │
│   ├── courses/
│   │   ├── CourseList.jsx          # List of user's courses
│   │   ├── CourseCard.jsx          # Individual course card
│   │   ├── CourseSelector.jsx      # Dropdown/modal for course selection
│   │   └── ModuleTree.jsx          # Hierarchical course content view
│   │
│   ├── sources/
│   │   ├── SourcePanel.jsx         # Side panel showing retrieved sources
│   │   ├── SourceCard.jsx          # Individual source preview
│   │   ├── PDFPreview.jsx          # PDF viewer modal
│   │   ├── VideoPlayer.jsx         # Video with timestamp navigation
│   │   └── SlidePreview.jsx        # PowerPoint slide preview
│   │
│   ├── auth/
│   │   ├── LoginPage.jsx           # Canvas OAuth login
│   │   ├── AuthCallback.jsx        # OAuth callback handler
│   │   └── ProtectedRoute.jsx      # Route guard component
│   │
│   └── common/
│       ├── Button.jsx              # Reusable button
│       ├── Input.jsx               # Reusable input
│       ├── LoadingSpinner.jsx      # Loading indicator
│       ├── ErrorBoundary.jsx       # Error handling
│       └── Modal.jsx               # Modal component
│
├── pages/
│   ├── HomePage.jsx                # Landing/welcome page
│   ├── ChatPage.jsx                # Main chat interface page
│   ├── CoursesPage.jsx             # Course management page
│   ├── HistoryPage.jsx             # Chat history page
│   └── SettingsPage.jsx            # User settings
│
├── hooks/
│   ├── useChat.js                  # Chat logic hook
│   ├── useCourses.js               # Course data fetching
│   ├── useAuth.js                  # Authentication state
│   ├── useRAG.js                   # RAG query hook
│   └── useLocalStorage.js          # Local storage helper
│
├── store/
│   ├── authStore.js                # Auth state (Zustand)
│   ├── chatStore.js                # Chat history state
│   ├── courseStore.js              # Selected courses state
│   └── uiStore.js                  # UI preferences state
│
├── services/
│   ├── api.js                      # Axios instance setup
│   ├── canvasAPI.js                # Canvas LMS API calls
│   ├── ragAPI.js                   # Backend RAG API calls
│   └── authService.js              # Authentication logic
│
├── utils/
│   ├── formatters.js               # Date, text formatting
│   ├── constants.js                # App constants
│   └── validators.js               # Input validation
│
├── styles/
│   ├── global.css                  # Global styles (migrated)
│   ├── variables.css               # CSS custom properties
│   └── animations.css              # Animation keyframes
│
├── App.jsx                         # Root component with router
├── main.jsx                        # Entry point
└── index.css                       # Base styles

```

## Key Features & Components

### 1. Chat Interface (`ChatInterface.jsx`)
- Main chat view with message history
- Real-time streaming responses
- Source citations displayed inline
- Message threading/conversation context

**State:**
- Current conversation messages
- Selected course context
- Streaming status

### 2. Chat Input (`ChatInput.jsx`)
- Migrated from your original beautiful glass-morphism input
- Auto-resize textarea
- Send on Enter, new line on Shift+Enter
- File upload for additional context (future)

### 3. Source Panel (`SourcePanel.jsx`)
- Shows retrieved documents for each answer
- Click to preview full document
- Highlights relevant sections
- Links back to Canvas

### 4. Course Selector (`CourseSelector.jsx`)
- Multi-select courses for context
- "All courses" option
- Filter by semester/term
- Shows course metadata

### 5. Message Components
**UserMessage:**
- Simple bubble with user's question
- Timestamp
- Edit/delete options (future)

**AIMessage:**
- Streaming support
- Source citations inline
- Copy button
- Feedback buttons (helpful/not helpful)

## Data Flow

### 1. Authentication Flow
```
User → LoginPage → Canvas OAuth → AuthCallback → Store Token → Redirect to ChatPage
```

### 2. Chat Flow
```
User types question → ChatInput
                    ↓
                ChatStore (add user message)
                    ↓
                useRAG hook → Backend API
                    ↓
                Backend: Retrieve relevant chunks → Generate answer
                    ↓
                Stream response → ChatStore (add AI message)
                    ↓
                Display in ChatMessage with SourceCitation
```

### 3. Course Selection Flow
```
User → CoursesPage → Fetch from Canvas API
                   ↓
                Display in CourseList
                   ↓
                User selects courses → CourseStore
                   ↓
                ChatPage uses selected courses as context filter
```

## State Management Strategy

### Zustand Stores

**authStore:**
```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  login: (token, user) => {},
  logout: () => {}
}
```

**chatStore:**
```javascript
{
  conversations: [],
  currentConversation: null,
  addMessage: (message) => {},
  createConversation: () => {},
  deleteConversation: (id) => {}
}
```

**courseStore:**
```javascript
{
  selectedCourses: [],
  availableCourses: [],
  toggleCourse: (courseId) => {},
  setAllCourses: () => {}
}
```

## Routing Structure

```javascript
/                           → HomePage (welcome/landing)
/login                      → LoginPage
/auth/callback              → AuthCallback
/chat                       → ChatPage (main interface)
/chat/:conversationId       → ChatPage (specific conversation)
/courses                    → CoursesPage
/history                    → HistoryPage
/settings                   → SettingsPage
```

## API Integration

### Backend Endpoints (to be implemented)
```
POST   /api/chat/query              # Send question, get RAG response
GET    /api/courses                 # Get user's Canvas courses
POST   /api/courses/sync            # Trigger course content sync
GET    /api/conversations           # Get chat history
POST   /api/conversations           # Create new conversation
GET    /api/sources/:id             # Get full source document
```

### Canvas LMS API Integration
```
GET    /api/v1/courses              # List courses
GET    /api/v1/courses/:id/modules  # Course modules
GET    /api/v1/files/:id            # Download files
```

## Styling Approach

### 1. Preserve Original Aesthetic
- Glass-morphism effects
- Instrument Serif font
- Smooth animations
- Elegant, minimal design

### 2. Extend with New Components
- Consistent design language
- Reusable CSS custom properties
- Responsive design (mobile-first)
- Dark mode support

### 3. CSS Variables (in `variables.css`)
```css
:root {
  --font-primary: 'Instrument Serif', serif;
  --color-glass-bg: rgba(255, 255, 255, 0.25);
  --color-text-primary: #333;
  --color-text-light: #ffffff;
  --glass-blur: blur(12px);
  --transition-smooth: 180ms ease;
}
```

## Performance Considerations

1. **Code Splitting**: Lazy load routes
2. **Virtualization**: For long message lists (react-window)
3. **Caching**: React Query for API responses
4. **Debouncing**: Search/filter inputs
5. **Image Optimization**: Lazy load images in sources

## Accessibility

1. **Keyboard Navigation**: Full keyboard support
2. **ARIA Labels**: Screen reader friendly
3. **Focus Management**: Proper focus states
4. **Color Contrast**: WCAG AA compliance

## Future Enhancements

1. **Real-time Collaboration**: Share conversations
2. **Voice Input**: Speech-to-text
3. **Export Chat**: PDF/Markdown export
4. **Advanced Filters**: Date range, content type
5. **Smart Suggestions**: Query auto-complete
6. **Personalization**: Learning preferences
