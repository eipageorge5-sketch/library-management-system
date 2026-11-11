import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create 4 Genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction', slug: 'fiction' },
  });

  const scifi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction', slug: 'science-fiction' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History', slug: 'history' },
  });

  const tech = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology', slug: 'technology' },
  });

  console.log('✅ Genres created');

  // 2. Create 15+ Books distributed across the genres
  const books = [
    // Fiction (4 books)
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '978-0451524935', genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0060935467', genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', genreId: fiction.id },
    
    // Science Fiction (4 books)
    { title: 'Dune', author: 'Frank Herbert', isbn: '978-0441172719', genreId: scifi.id },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '978-0553293357', genreId: scifi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '978-0441569595', genreId: scifi.id },
    { title: 'The Martian', author: 'Andy Weir', isbn: '978-0553418026', genreId: scifi.id },

    // History (4 books)
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '978-0062316097', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '978-0393354324', genreId: history.id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '978-0553296983', genreId: history.id },
    { title: 'A People\'s History of the United States', author: 'Howard Zinn', isbn: '978-0062397348', genreId: history.id },

    // Technology (4 books)
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', genreId: tech.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '978-0135957059', genreId: tech.id },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '978-1449373320', genreId: tech.id },
    { title: 'Code Complete', author: 'Steve McConnell', isbn: '978-0735619678', genreId: tech.id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genreId: book.genreId,
        totalCopies: 5,
        availableCopies: 5,
      },
    });
  }

  console.log('✅ Books created');
  console.log('🎉 Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });