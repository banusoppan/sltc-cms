import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class FormValidator {
  static branchForm( fb : FormBuilder) : FormGroup {


    return fb.group({

      'branches':fb.array([
          this.addEdu(fb)
      ]),

    });

  }
  static addEdu(fb: FormBuilder ,):FormGroup{

    return fb.group({
      'branchName': [null,[Validators.required,Validators.minLength(3),Validators.maxLength(70)]],
      'address': [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    })

  }

}
