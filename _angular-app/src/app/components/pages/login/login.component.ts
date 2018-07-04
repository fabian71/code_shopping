import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 credentials = {
    email: '',
    password: ''
 };

 public token;

 constructor(private http: HttpClient) {

 }

  ngOnInit() {

  }

  submit() {
    this.http.post('http://localhost:8000/api/login',this.credentials)
        .subscribe(
            (data) => this.token = JSON.stringify(data)

        );



    return false;
  }



}
