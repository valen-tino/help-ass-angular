import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control-image',
  templateUrl: './form-control-image.component.html',
  styleUrls: ['./form-control-image.component.css']
})
export class FormControlImageComponent {
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() type: string = '';
  @Input() currentFormGroup!: FormGroup;

  imageUrl: string | undefined;

  constructor(private fb: FormBuilder) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.currentFormGroup?.get(this.controlName)?.setValue(file);
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageUrl = reader.result as string;
    };
  }

}
