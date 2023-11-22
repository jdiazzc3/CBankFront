import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{

  private API_SERVER = "http://localhost:8080/cuenta/guardarCuenta";

  cuentaForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    ){
      this.cuentaForm = this.fb.group({
        telefono : ['', [Validators.required, Validators.minLength(3)]],
        pin : ['', [Validators.required, Validators.minLength(3)]],
       });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      console.log('ID del usuario:', userId);
  
      
    });
  }

  guardarCuenta() {  
    this.route.params.subscribe(params => {
      const userId = parseInt(params['userId'], 10); // Convierte el userId a un número entero
      console.log(this.cuentaForm.value);
      
      const cuentaData = {
        ...this.cuentaForm.value,
        usuarioId: userId,
        saldo: 0
      };
  
      console.log(cuentaData);
  
      this.saveAccount(cuentaData).subscribe(resp => {
        alert('Usuario creado correctamente');
        this.cuentaForm.reset();
      });
    });
  }
  
    saveAccount(cuenta: any){
      return this.http.post<any>(this.API_SERVER, cuenta);
    }


}
