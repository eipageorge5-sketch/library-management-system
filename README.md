# library-management-system
## Schema Decisions

In designing the data layer for this library system, I chose a **relational approach** (PostgreSQL + Prisma) over a document-based approach (like MongoDB) for the following reasons:

1. **Data Integrity & Normalization**: A `Genre` (e.g., "Science Fiction") is a distinct entity that can be associated with hundreds of `Books`. By using a foreign key (`genreId`) and a `@relation` in Prisma, we normalize the data. If we were to embed the genre directly inside every book document, updating a genre's name would require updating thousands of individual book records, leading to data duplication and inconsistency.
2. **Strict Constraints**: Relational databases allow us to enforce strict constraints at the database level. For example, the `@unique` constraint on `isbn` and `genre.slug` guarantees that no two books can have the same ISBN, and no two genres can have the same slug, preventing logical errors before they even reach the application layer.
3. **Efficient Querying**: With foreign keys and proper indexing, PostgreSQL can efficiently execute `JOIN` operations. Fetching a book along with its genre details is highly optimized, whereas embedded documents can lead to bloated payloads if we only need the book's title but accidentally pull the entire embedded genre object every time.

*(Stretch Goal Note: I also added a `Review` model to demonstrate a many-to-one relationship, where multiple users can review multiple books, requiring a dedicated table with `userId` and `bookId` foreign keys to maintain referential integrity.)*
