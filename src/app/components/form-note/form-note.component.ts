import { Component, ElementRef, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INote } from 'src/app/model/INote';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-form-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit, OnChanges {

  @Input() note!: INote;
  @Output() onSubmit = new EventEmitter<INote>();

  public form: FormGroup;
  private user = this.loginService.user;
  /*@ViewChild('title') title!:ElementRef;
  public description!:string;*/

  constructor(private fb: FormBuilder, private loginService:LoginService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      id: ['']
    })
  }
  ngOnInit(): void {
    if (this.note && this.note.title) {
      this.form.setValue(this.note);

      /*this.form.patchValue({
        id: this.note.id
      });*/
    }
  }

  ngOnChanges($changes: any) {
    console.log($changes)
    if ($changes.note && $changes.note.currentValue) {
      this.form.setValue($changes.note.currentValue);
    }

  }

  submit() {
    //VALID
    let newNote: INote = {
      id: this.form.value.id,// <<-- new
      title: this.form.value.title,
      description: this.form.value.description,
      userId: this.user.id
    }
    console.log(newNote);
    
    this.onSubmit.emit(newNote);
    //this.form.reset();
  }
}
