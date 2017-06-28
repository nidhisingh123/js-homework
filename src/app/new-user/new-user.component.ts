import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {FormControl, Validators, NgModel, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  public userForm : FormGroup;
  public errorResponse : any;

  constructor(
    private userService : UserService,
    private fb: FormBuilder,
    private router:Router
  ) {

    this.errorResponse = JSON.parse(this.userService.getErrorResponse());

    this.userForm = fb.group({
      'firstName' : [null, Validators.compose([Validators.required])],
      'lastName': [null, Validators.compose([Validators.required])],
      'email' : [null, Validators.compose([Validators.required,  Validators.pattern(EMAIL_REGEX)])],
    })
  }

  ngOnInit() {
  }

  submit(userForm){

    console.log(userForm);
    if(userForm.status == 'VALID'){
      this.userService.addUser(userForm.value);
      this.router.navigate(['/'])
    }
  }


}
