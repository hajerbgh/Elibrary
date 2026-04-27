import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal, ChevronRight, Bell } from 'lucide-react';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import BookModal from '../components/BookModal';
import './Dashboard.css';

const Dashboard = ({ user, onToggleLibrary, onToggleFavorite, library, favorites }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await axios.get('/api/books');
        const categoriesRes = await axios.get('/api/books/categories');
        setBooks(booksRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="search-container">
          <div className="category-dropdown" onClick={() => setSelectedCategory(null)}>
            <span>{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Categories'}</span>
            <ChevronRight size={16} className="rotate-90" />
          </div>
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Find the book you like..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="search-button">Search</button>
        </div>

        <div className="user-profile">
          <div className="profile-info">
            <img src={user?.avatar || "https://i.pravatar.cc/150"} alt="User" className="avatar" />
            <span className="user-name">{user?.name || "Guest"}</span>
            <ChevronRight size={16} className="rotate-90" />
          </div>
          <div className="notification-btn">
            <Bell size={20} />
            <span className="dot"></span>
          </div>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="content-intro">
          <h1>Discover</h1>
        </div>

        <div className="section-header">
          <h2>Book Recommendation</h2>
          <button className="view-all">View all <ChevronRight size={16} /></button>
        </div>

        <div className="books-grid horizontal-scroll">
          {loading ? (
            <p>Loading books...</p>
          ) : (
            filteredBooks.map(book => (
              <div key={book.id} onClick={() => setSelectedBook(book)}>
                <BookCard book={book} />
              </div>
            ))
          )}
        </div>

        <div className="section-header top-margin">
          <h2>Book Category</h2>
          <button className="filter-btn"><SlidersHorizontal size={20} /></button>
        </div>

        <div className="categories-grid">
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            categories.map(cat => (
              <div key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
                <CategoryCard category={cat} />
              </div>
            ))
          )}
        </div>

        {selectedBook && (
          <BookModal 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)}
            onToggleLibrary={onToggleLibrary}
            onToggleFavorite={onToggleFavorite}
            isInLibrary={library.some(b => b.id === selectedBook.id)}
            isFavorite={favorites.some(b => b.id === selectedBook.id)}
          />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
