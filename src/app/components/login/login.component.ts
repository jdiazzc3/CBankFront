import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private API_SERVER = "http://localhost:8080/cuenta/obtenerIdPorTelefono";

  loginForm!: FormGroup;
  idCuenta: number | null = null; 

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      telefono: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  iniciarSesion() {
    const telefono = this.loginForm.get('telefono')?.value;
    const api = `${this.API_SERVER}/${telefono}`
    this.http.get<any>(api).subscribe(
      resp => {
        this.idCuenta = resp;
        console.log(this.idCuenta); 
        localStorage.setItem('idCuenta', this.idCuenta!.toString());
        this.router.navigate(['/account-auth', this.idCuenta]);
      },
      (error) => {
        alert('El número de teléfono no está asociado a ninguna cuenta');
      }
    );
  }

}
