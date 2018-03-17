import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  validationForm = this.fb.group({});
  invalidEmail: boolean;
  passwordMatch: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm = () => {
    this.validationForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'rePassword': ['', [Validators.required]],
    });
  }

  get email() { return this.validationForm.get('email'); }
  get password() { return this.validationForm.get('password'); }
  get rePassword() { return this.validationForm.get('rePassword'); }

  submitForm = () => {
    const data = this.validationForm.value;
    let x = true;
    this.invalidEmail = false;
    this.passwordMatch = false;
    console.log(data.rePassword);
    const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (reg.test(data.email) === false) {
        this.invalidEmail = true;
        x = false;
      }
      if (data.password !== data.rePassword) {
        this.passwordMatch = true;
        x = false;
      }
      if (x) {
        alert('Data submitted');
        // Http post on an api named something.com
        this.http.post('something.com', data);
        this.validationForm.reset();
      }
    }

}
