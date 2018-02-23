import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Book } from './book-service/book';
import { BookService } from './book-service/book.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookForm: FormControl;
  booksSearched = [];
  addedBook: Book;
  currentUser;

  constructor(private http: HttpClient,
    private bookService: BookService,
    private toastr: ToastrService,
    private fireAuth: AngularFireAuth) {
    this.currentUser = this.fireAuth.auth.currentUser;
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.bookForm = new FormControl();
    this.bookForm
      .valueChanges
      .debounceTime(200)
      .subscribe((value) => {
        this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + value)
          .map((book: any) => {
            return book.items;
          })
          .subscribe((arrayBook) => {
            this.booksSearched = arrayBook;
          });
      });
  }

  onInsertBook(book) {
    this.addedBook = new Book;
    this.addedBook.title = book.title;
    this.addedBook.authors = (book.authors == null || book.authors === undefined) ? 'Unknown' : book.authors;
    this.addedBook.description = (book.description == null || book.description === undefined) ? 'No description' : book.description;
    this.addedBook.pageCount = (book.pageCount == null || book.pageCount === undefined) ? 'No page count' : book.pageCount;
    this.addedBook.imageLinks = (book.imageLinks == null || book.imageLinks === undefined)
      ? {
        'smallThumbnail'
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
      }
      : book.imageLinks;
    this.addedBook.user = this.currentUser.email;
    this.bookService.insertBook(this.addedBook);
    setTimeout(() => {
      this.toastr.success('Completed', 'Added done!');
    }, 300);
    // Display an alert box after 3 seconds (300 milliseconds):
  }
}

