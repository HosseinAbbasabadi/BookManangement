import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  books: Book[] = []

  constructor(private readonly bookService: BookService) {
  }

  ngOnInit(): void {
    this.books = this.bookService.list()
  }
}