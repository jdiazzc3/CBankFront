import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private API_SERVER = "http://localhost:8080/usuario/guardarUsuario";

  usuarioForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ){
      this.usuarioForm = this.fb.group({
        nombre : ['', [Validators.required, Validators.minLength(3)]],
        apellido : ['', [Validators.required, Validators.minLength(3)]],
        cedula : ['', [Validators.required, Validators.minLength(10)]],
        correo : ['', [Validators.required, Validators.minLength(3)]],
       });
  }


    guardar(){  
      console.log(this.usuarioForm.value);
      this.saveUser(this.usuarioForm.value).subscribe(resp => {
        const userId = resp.id;
        console.log(userId);
        alert('Usuario creado correctamente');
        this.usuarioForm.reset();
        this.router.navigate(['/login', userId]);
      });
   
  }

  saveUser(persona: any){
    return this.http.post<any>(this.API_SERVER, persona);
  }



}
