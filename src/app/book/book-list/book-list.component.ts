import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { NgFor, NgIf } from '@angular/common';
import { BookCategoryService } from '../book-category.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {

  books: Book[] = []

  constructor(private readonly bookService: BookService,
    private readonly bookCategoryService: BookCategoryService) {
  }

  ngOnInit(): void {
    this.books = this.bookService.list()
    const categories = this.bookCategoryService.list()

    this.books.forEach(book => {
      book.categoryTitle = categories.find(x => x.id == book.categoryId)?.title
    })
  }
}