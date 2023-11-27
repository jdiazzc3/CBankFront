import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-auth',
  templateUrl: './account-auth.component.html',
  styleUrls: ['./account-auth.component.css']
})
export class AccountAuthComponent implements OnInit {

  private API_SERVER = "http://localhost:8080/cuenta/verificarCuentaPorIdYPin";

  authForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    localStorage.setItem('loggedIn', 'false');
  }

  autenticarCuenta() {
    this.route.params.subscribe(params => {
      const accountId = parseInt(params['accountId'], 10); // Convierte el userId a un número entero

      const authData = {
        ...this.authForm.value,
        id: accountId,
      };

      console.log(authData);

      this.authAccount(authData).subscribe(resp => {
        alert('Usuario autenticado correctamente');
        localStorage.setItem('loggedIn', 'true');
        this.authForm.reset();
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        alert('El pin es incorrecto');
      });
    });
  }

  authAccount(auth: any) {
    return this.http.post<any>(this.API_SERVER, auth);
  }

}
