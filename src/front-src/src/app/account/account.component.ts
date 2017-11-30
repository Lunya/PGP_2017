import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';

const url = 'http://localhost:3000/api/user'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private loading = false;
  private signupForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const newPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, CustomValidators.email]],
      name: [null, [Validators.required, Validators.minLength(2)]],
      password: password,
      newPassword: newPassword
    });
  }

  ngOnInit() {}

  ngCancel(){
    this.router.navigate(['/home']);
  }

  ngOnSubmit() {
    this.loading = true;
    let rndUser = '6'; //IDUSER A RECUPERER VIA COMMANDE GET OU VIA UN ID LORS DE L'AUTHENTIFICATION
    this.http.patch(url + '/' + rndUser, this.signupForm.value).subscribe((result : any) => {
      if(result.error)
        this.loading = false;
      else {
        console.log(result);
        this.router.navigate(['home']);
      }
    }, err => {
      console.log(err);
      this.loading = false;
    }
  )}
 }
