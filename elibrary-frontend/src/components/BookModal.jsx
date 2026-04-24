import React from 'react';
import './BookModal.css';
import { X, Star, Heart, Bookmark, Play } from 'lucide-react';

const BookModal = ({ book, onClose, onToggleLibrary, onToggleFavorite, isInLibrary, isFavorite }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="book-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-body">
          <div className="modal-left">
            <img src={book.cover_image} alt={book.title} />
          </div>
          
          <div className="modal-right">
            <span className="modal-category">{book.category_name}</span>
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            
            <div className="modal-stats">
              <div className="stat">
                <Star size={18} fill="#FFD700" color="#FFD700" />
                <span>{book.rating}</span>
              </div>
              <div className="stat favorite-stat" onClick={() => onToggleFavorite(book)}>
                <Heart size={18} fill={isFavorite ? "#FF7675" : "none"} color="#FF7675" />
                <span>{isFavorite ? 'In Favorites' : 'Add to Favorites'}</span>
              </div>
            </div>
            
            <p className="modal-description">{book.description}</p>
            
            <div className="modal-actions">
              <button className="btn-primary">
                <Play size={18} />
                Read Now
              </button>
              <button 
                className={`btn-secondary ${isInLibrary ? 'active' : ''}`}
                onClick={() => onToggleLibrary(book)}
              >
                <Bookmark size={18} fill={isInLibrary ? "currentColor" : "none"} />
                {isInLibrary ? 'In Library' : 'Add to Library'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
