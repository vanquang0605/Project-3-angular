import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from './book';

@Injectable()
export class BookService {
  bookList: AngularFireList<any>;
  bookSelected: Book;
  constructor(private fireDB: AngularFireDatabase) {
  }

  getBooks() {
    this.bookList = this.fireDB.list('books');
    return this.bookList;
  }

  insertBook(book: Book) {
    this.bookList.push(book);
    console.log(book);
  }

  updateBook(book: Book) {
    console.log(book);
    this.bookList.update(book.$key, {
      title: book.title,
      description: book.description,
      authors: book.authors,
      imageLinks: book.imageLinks,
      pageCount: book.pageCount,
    });
  }

  deleteBook($key) {
    this.bookList.remove($key);
  }
}
