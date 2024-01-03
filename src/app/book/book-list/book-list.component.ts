import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { NgFor, NgIf } from '@angular/common';
import { BookCategoryService } from '../book-category.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { BookCategory } from '../book-category';
import { Jalali } from 'jalali-ts';
import { ModalComponent } from '../../shared/modal/modal.component';
declare var bootstrap: any
declare var $: any

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    ModalComponent
  ],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit, AfterViewInit {

  books: Book[] = []
  bookForm!: FormGroup
  categories: BookCategory[] = []

  dateMin = Jalali.parse('1402-10-01').valueOf()
  dateMax = Jalali.parse('1402-11-01').valueOf()
  modal: any

  @ViewChild('infoModal') infoModal: ModalComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly bookService: BookService,
    private readonly bookCategoryService: BookCategoryService) {
    this.initForm()
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      guid: [''],
      title: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      author: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      categoryId: [0],
      date: [''],
      isPublished: [false]
    })
  }

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(document.getElementById('opsModal'), {
      keyboard: false,
      backdrop: 'static'
    })
  }

  ngOnInit(): void {
    this.getList()
    this.categories = this.bookCategoryService.list()

    this.books.forEach(book => {
      book.categoryTitle = this.categories.find(x => x.id == book.categoryId)?.title
    })
  }

  getList() {
    this.books = this.bookService.list()
  }

  get title() {
    return this.bookForm.get('title')
  }

  get author() {
    return this.bookForm.get('author')
  }

  openModal(guid: string | undefined = undefined) {
    if (guid) {
      const book = this.bookService.find(guid)!
      this.bookForm.patchValue(book)
    } else {
      this.initForm()
    }

    this.modal.show()
  }

  submit() {
    if (this.bookForm.invalid) {
      alert('form is invalid')
    }

    const command = this.bookForm.value
    if (command.guid) {
      this.bookService.edit(command)
    } else {
      command.guid = crypto.randomUUID()
      this.bookService.add(command)
    }

    this.getList()
    this.modal.hide()
  }

  opsModalClose() {
    this.modal.hide()
  }

  submited() {
    console.log('modal submited')
    this.infoModal.close()
  }
}