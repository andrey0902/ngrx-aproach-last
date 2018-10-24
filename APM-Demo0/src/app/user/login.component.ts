import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import {Store} from '@ngrx/store';
import { select } from '@ngrx/store';

import * as fromUsers from './state';
import { takeWhile } from 'rxjs/internal/operators';
import { AppState } from '../state/app.state';
import * as fromUser from './action/user.actions';
import { MaskUserName } from './action/user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;
  componentActive = true;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.setUpMaskUserName();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  setUpMaskUserName() {
    this.store.pipe(
      takeWhile(() => this.componentActive),
      select(fromUsers.getUsersMaskName)
    ).subscribe((maskUserName: boolean) => {
        this.maskUserName = maskUserName;
    } );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new fromUser.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
