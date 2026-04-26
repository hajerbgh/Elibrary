USE elibrary_db;

-- Insérer des catégories
INSERT INTO categories (name, icon) VALUES 
('Business', '💼'),
('Fiction', '📖'),
('Technology', '💻'),
('Science', '🔬'),
('History', '📜');

-- Insérer des livres (apostrophes échappées)
INSERT INTO books (title, author, description, cover_image, category_id, rating) VALUES 
('The Psychology of Money', 'Morgan Housel', 'Timeless lessons on wealth, greed, and happiness. Doing well with money is not necessarily about what you know. It is about how you behave.', 'https://m.media-amazon.com/images/I/71TbI8c5+LL._AC_UF1000,1000_QL80_.jpg', 1, 4.8),
('Company of One', 'Paul Jarvis', 'The Company of One approach is a new way to focus on something better than growth. It is a strategy for staying small and achieving high profit.', 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg', 1, 4.5),
('How Innovation Works', 'Matt Ridley', 'Innovation is the most important economic force in the modern world. Ridley argues that it is an incremental, bottom-up, evolutionary process.', 'https://m.media-amazon.com/images/I/81h2gWPTYJL._AC_UF1000,1000_QL80_.jpg', 3, 4.6),
('The Picture of Dorian Gray', 'Oscar Wilde', 'A classic Victorian era gothic novel about a man whose portrait ages while he stays young and beautiful, leading to a life of decadence.', 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg', 2, 4.7),
('Atomic Habits', 'James Clear', 'An Easy and Proven Way to Build Good Habits and Break Bad Ones. Tiny changes, remarkable results.', 'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg', 1, 4.9),
('Sapiens', 'Yuval Noah Harari', 'A Brief History of Humankind. From the emergence of Homo sapiens to the present day.', 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg', 5, 4.8),
('Clean Code', 'Robert C. Martin', 'A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code is not clean, it can bring a development organization to its knees.', 'https://m.media-amazon.com/images/I/51E2055ZGUL._AC_UF1000,1000_QL80_.jpg', 3, 4.7),
('The Lean Startup', 'Eric Ries', 'How Today Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.', 'https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UF1000,1000_QL80_.jpg', 1, 4.6);
