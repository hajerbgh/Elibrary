import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import BookCard from './components/BookCard';
import ChatSidebar from './components/ChatSidebar';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [library, setLibrary] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActiveTab('discover');
    setAuthMode('login');
  };

  const toggleLibrary = (book) => {
    setLibrary(prev => 
      prev.find(b => b.id === book.id) 
        ? prev.filter(b => b.id !== book.id) 
        : [...prev, book]
    );
  };

  const toggleFavorite = (book) => {
    setFavorites(prev => 
      prev.find(b => b.id === book.id) 
        ? prev.filter(b => b.id !== book.id) 
        : [...prev, book]
    );
  };

  if (!user) {
    return authMode === 'login' ? (
      <Login 
        onLogin={handleLogin} 
        onSwitchToSignup={() => setAuthMode('signup')} 
      />
    ) : (
      <Signup 
        onSignupSuccess={() => setAuthMode('login')} 
        onSwitchToLogin={() => setAuthMode('login')} 
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          if (tab === 'logout') {
            handleLogout();
          } else {
            setActiveTab(tab);
          }
        }} 
      />
      <main className={`main-content ${activeTab === 'discover' ? 'with-chat' : ''}`}>
        {activeTab === 'discover' && (
          <Dashboard 
            user={user}
            onToggleLibrary={toggleLibrary} 
            onToggleFavorite={toggleFavorite} 
            library={library}
            favorites={favorites}
          />
        )}
        {activeTab === 'library' && (
          <div className="section-page">
            <header className="page-header">
              <h1>My Library</h1>
              <p>{library.length} books in your collection</p>
            </header>
            <div className="books-grid">
              {library.length > 0 ? (
                library.map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <p className="no-data">Your library is empty. Start adding books!</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'favorite' && (
          <div className="section-page">
            <header className="page-header">
              <h1>Favorite Books</h1>
              <p>{favorites.length} books you love</p>
            </header>
            <div className="books-grid">
              {favorites.length > 0 ? (
                favorites.map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <p className="no-data">You haven't liked any books yet.</p>
              )}
            </div>
          </div>
        )}
        {!['discover', 'library', 'favorite'].includes(activeTab) && (
          <div className="empty-state">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h1>
            <p>This section is coming soon. Stay tuned!</p>
          </div>
        )}
      </main>
      {activeTab === 'discover' && <ChatSidebar />}
    </div>
  );
}

export default App;
