import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-service/book.service';
import { Book } from '../book-service/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
  }

}
