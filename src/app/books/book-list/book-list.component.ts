import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-service/book.service';
import { Book } from '../book-service/book';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../authentication/user.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  user: User;
  books: Book[];

  constructor(private bookService: BookService,
    private toastr: ToastrService,
    private fireAuth: AngularFireAuth) {
    this.user = this.fireAuth.auth.currentUser;
  }

  ngOnInit() {
    this.bookService.getBooks().snapshotChanges()
      .subscribe((books: any) => {
        this.books = [];
        books.forEach((element) => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x.user === this.user.email) {
            this.books.push(x as Book);
          }
        });
      });
  }

  onDeleteBook(key) {
    if (confirm('Do want to delete this book?')) {
      this.bookService.deleteBook(key);
    }
  }
}
