import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control-input',
  templateUrl: './form-control-input.component.html',
  styleUrls: ['./form-control-input.component.css'],
})
export class FormControlInputComponent {
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
  @Input() type: string = ''; 
  @Input() label: string = '';
  @Input() currentFormGroup!: FormGroup;
}
