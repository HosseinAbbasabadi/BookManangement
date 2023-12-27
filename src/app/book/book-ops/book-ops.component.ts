import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../book';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-ops',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './book-ops.component.html'
})
export class BookOpsComponent {

  guid: string | null

  bookForm!: FormGroup
  // bookForm = new FormGroup({
  //   guid: new FormControl(''),
  //   title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  //   author: new FormControl(''),
  //   categoryId: new FormControl(0),
  //   date: new FormControl(''),
  //   isPublished: new FormControl(false),
  // })

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder) {

    this.bookForm = formBuilder.group({
      guid: [''],
      title: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8)
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

    this.guid = activatedRoute.snapshot.paramMap.get('guid')
    console.log(this.guid)
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
  }
}
