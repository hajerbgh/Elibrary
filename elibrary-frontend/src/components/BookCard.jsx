import React from 'react';
import './BookCard.css';
import { Star } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img src={book.cover_image} alt={book.title} className="book-cover" />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-meta">
          <div className="book-rating">
            <Star size={14} fill="#FFD700" color="#FFD700" />
            <span>{book.rating}</span>
          </div>
          <span className="book-category-tag">{book.category_name}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
