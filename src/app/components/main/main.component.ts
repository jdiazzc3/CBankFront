import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private API_SERVER = "http://localhost:8080/cuenta/obtenerCuentaPorId";
  saldo: number = 0;
  cuenta: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerInfoCuenta();
  }

  obtenerInfoCuenta(): void {
    console.log(localStorage.getItem('idCuenta'));
    this.http.get<number>(`${this.API_SERVER}/${localStorage.getItem('idCuenta')}`).subscribe(
      resp => {
        this.cuenta = resp;
        this.saldo = this.cuenta.saldo;     
      },
      (error) => {
        console.error('Error al obtener el saldo:', error);
      }
    );
  }

}
