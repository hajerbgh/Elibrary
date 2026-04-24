const db = require('./src/config/db');

async function update() {
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255) DEFAULT 'https://i.pravatar.cc/150'
      )
    `);

    // Create favorites table
    await db.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        book_id INT,
        FOREIGN KEY (book_id) REFERENCES books(id)
      )
    `);

    // Update descriptions
    await db.query("UPDATE books SET description = 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn’t necessarily about what you know. It’s about how you behave.' WHERE title = 'The Psychology of Money'");
    await db.query("UPDATE books SET description = 'The \"Company of One\" approach is a new way to focus on something better than growth. It’s a strategy for staying small and achieving high profit.' WHERE title = 'Company of One'");
    await db.query("UPDATE books SET description = 'Innovation is the most important economic force in the modern world. Ridley argues that it is an incremental, bottom-up, evolutionary process.' WHERE title = 'How Innovation Works'");
    await db.query("UPDATE books SET description = 'A classic Victorian era gothic novel about a man whose portrait ages while he stays young and beautiful, leading to a life of decadence.' WHERE title = 'The Picture of Dorian Gray'");

    console.log("Platform data updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

update();
