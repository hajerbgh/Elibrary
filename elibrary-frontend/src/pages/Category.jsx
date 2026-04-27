import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import BookModal from '../components/BookModal';
import './Category.css';

const Category = ({ onToggleLibrary, onToggleFavorite, library, favorites }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await axios.get('http://localhost:5000/api/books');
        const categoriesRes = await axios.get('http://localhost:5000/api/books/categories');
        setBooks(Array.isArray(booksRes.data) ? booksRes.data : []);
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setBooks([]);
        setCategories([]);
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

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="category-page">
      <header className="category-header">
        <div className="header-top">
          <h1>Browse by Category</h1>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>
        </div>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search books in this category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="category-content">
        <aside className={`categories-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="sidebar-header">
            <h3>All Categories</h3>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="category-list">
            <button 
              className={`category-item ${!selectedCategory ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(null);
                setShowFilters(false);
              }}
            >
              <span>All Books</span>
              <span className="count">{books.length}</span>
            </button>
            {categories.map(cat => {
              const count = books.filter(b => b.category_id === cat.id).length;
              return (
                <button 
                  key={cat.id}
                  className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowFilters(false);
                  }}
                >
                  <span>{cat.name}</span>
                  <span className="count">{count}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="category-main">
          {selectedCategory && selectedCategoryData && (
            <div className="selected-category-banner">
              <div className="banner-content">
                <h2>{selectedCategoryData.name}</h2>
                <p>{filteredBooks.length} books available</p>
              </div>
              <button 
                className="clear-filter"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <p>Loading books...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="books-grid">
              {filteredBooks.map(book => (
                <div key={book.id} onClick={() => setSelectedBook(book)}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No books found in this category.</p>
            </div>
          )}
        </main>
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
    </div>
  );
};

export default Category;