import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  API_SERVER = "http://localhost:8080/transferencia/historialTransferencias";
  historial: any;

    constructor(
      private router: Router,
      private http: HttpClient
    ) { }

    ngOnInit(): void {
      this.obtenerHistorial();
    }

    obtenerHistorial() {
      const idCuenta = localStorage.getItem('idCuenta');
      const api = `${this.API_SERVER}/${idCuenta}`
      this.http.get<any>(api).subscribe(
        resp => {
          this.historial = resp;
          console.log(this.historial);
        },
        (error) => {
          alert('No se pudo obtener el historial');
        }
      );
    }
    obtenerTipoTransferencia(transferencia: any): string {
      const idCuenta = localStorage.getItem('idCuenta');
      const idCuentaNum = parseInt(idCuenta!, 10);
      if (transferencia.cuentaDestino === idCuentaNum) {
        return 'Recibo';
      } else if (transferencia.cuentaOrigen === idCuentaNum) {
        return 'Envío';
      } else {
        return 'Desconocido';
      }
    }
}
