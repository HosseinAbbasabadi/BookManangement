import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../book';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-ops',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './book-ops.component.html'
})
export class BookOpsComponent implements OnInit {

  guid: string | null = ''
  summary: string = ''

  categories = [
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
    },
  ]

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
    private readonly bookService: BookService) {

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
    this.guid = this.activatedRoute.snapshot.paramMap.get('guid')
    if (this.guid) {
      const book = this.bookService.find(this.guid)!
      this.bookForm.patchValue(book)
    }
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
  }
}
