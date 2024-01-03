import { Injectable } from '@angular/core';
import { Book } from './book';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = []
  private lsName = 'books'

  constructor(private readonly localStorageService: LocalStorageService) {
    this.books = this.initList()
  }

  initList(): Book[] {
    const books = this.localStorageService.getItem(this.lsName)
    if (!books) return []

    const list = JSON.parse(books)
    if (!list) return []

    return list
  }

  list() {
    return this.books
  }

  add(book: Book) {
    this.books.push(book)
    this.localStorageService.setItem(this.lsName, JSON.stringify(this.books))
  }

  edit(book: Book) {
    const books = this.list()
    const index = books.findIndex(x => x.guid == book.guid)
    books.splice(index, 1)
    books.push(book)
    this.localStorageService.setItem(this.lsName, JSON.stringify(books))
  }

  find(guid: string) {
    return this.books.find(x => x.guid == guid)
  }

  findBy(title: string) {
    return this.books.find(x => x.title == title)
  }

  length() {
    return this.books.length
  }

  delete(book: Book) {
    const index = this.books.indexOf(book)
    this.books.splice(index, 1)
    localStorage.setItem(this.lsName, JSON.stringify(this.books))
  }

  deleteAll() {
    localStorage.removeItem(this.lsName)
    this.books = []
  }
}