const db = require('./src/config/db');

async function update() {
  try {
    await db.query("UPDATE books SET cover_image = '/covers/psychology_money.png' WHERE title = 'The Psychology of Money'");
    await db.query("UPDATE books SET cover_image = '/covers/company_of_one.png' WHERE title = 'Company of One'");
    await db.query("UPDATE books SET cover_image = '/covers/innovation_works.png' WHERE title = 'How Innovation Works'");
    await db.query("UPDATE books SET cover_image = '/covers/dorian_gray.png' WHERE title = 'The Picture of Dorian Gray'");
    console.log("Database updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

update();
