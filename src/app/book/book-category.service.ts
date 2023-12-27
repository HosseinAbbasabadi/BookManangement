import { Injectable } from '@angular/core';
import { BookCategory } from './book-category';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {

  list(): BookCategory[] {
    return [
      {
        id: 1,
        title: 'Programming'
      },
      {
        id: 2,
        title: 'Testing'
      },
      {
        id: 3,
        title: 'Architecture'
      }
    ]
  }
}