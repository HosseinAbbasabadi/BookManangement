import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BookService } from '../book.service';
import { BookCategoryService } from '../book-category.service';
import { BookCategory } from '../book-category';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { Jalali } from 'jalali-ts';
import { Hotkey, HotkeyModule, HotkeyOptions, HotkeysService } from 'angular2-hotkeys';
import { HotkeysAllowedIn, ctrlS } from '../../shared/hotkey-names';

@Component({
  selector: 'app-book-ops',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgPersianDatepickerModule
  ],
  templateUrl: './book-ops.component.html'
})
export class BookOpsComponent implements OnInit {

  guid: string | null = ''
  summary: string = ''

  dateMin = Jalali.parse('1402-10-01').valueOf()
  dateMax = Jalali.parse('1402-11-01').valueOf()

  categories: BookCategory[] = []

  bookForm!: FormGroup
  // bookForm = new FormGroup({
  //   guid: new FormControl(''),
  //   title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  //   author: new FormControl(''),
  //   categoryId: new FormControl(0),
  //   date: new FormControl(''),
  //   isPublished: new FormControl(false),
  // })

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly bookService: BookService,
    private readonly bookCategoryService: BookCategoryService) {

    this.bookForm = formBuilder.group({
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

    this.bookForm
      .valueChanges
      .subscribe(data => {
        this.summary = `the book named: ${data.title} authored by: ${data.author} published at: ${data.date} is in category: ${data.categoryId}`
      })

    // this.bookForm
    //   .get('title')
    //   ?.valueChanges
    //   .subscribe(title => {
    //     console.log(title)
    //   })
  }

  ngOnInit(): void {
    this.categories = this.bookCategoryService.list()
    this.guid = this.activatedRoute.snapshot.paramMap.get('guid')
    if (this.guid) {
      const book = this.bookService.find(this.guid)!
      this.bookForm.patchValue(book)
    }

    this.registerHotkeys()
  }

  registerHotkeys() {
    // this.hotkeyService
    //   .add(new Hotkey(ctrlS, (_event: KeyboardEvent): boolean => {
    //     console.log("Ctrl + S")
    //     return false
    //   }, HotkeysAllowedIn))
  }

  get title() {
    return this.bookForm.get('title')
  }

  get author() {
    return this.bookForm.get('author')
  }

  submit() {
    if (this.bookForm.invalid) {
      alert('form is invalid')
    }

    const command = this.bookForm.value
    if (this.guid) {
      this.bookService.edit(command)
    } else {
      command.guid = crypto.randomUUID()
      this.bookService.add(command)
    }

    this.router.navigateByUrl('/book-list')
    // this.router.navigate(['', ])
  }
}
