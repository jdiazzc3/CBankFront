import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  API_SERVER = "http://localhost:8080/cuenta/obtenerIdPorTelefono";
  API_SERVER2 = "http://localhost:8080/transferencia/guardarTransferencia";

  transactionForm!: FormGroup;
  idCuenta1: number | null = null;
  fecha: Date = new Date();

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.transactionForm = this.fb.group({
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      monto: ['', [Validators.required, Validators.minLength(1)]],
    });
   }

   transferir() {
    const telefono = this.transactionForm.get('telefono')?.value;
    const monto = this.transactionForm.get('monto')?.value;
    const api = `${this.API_SERVER}/${telefono}`
    this.http.get<any>(api).subscribe(
      resp => {
        this.idCuenta1 = resp;
        console.log(this.idCuenta1); 
        console.log(Date)
        const idCuenta2 = localStorage.getItem('idCuenta');
        const transferencia = {
        cuentaDestino: this.idCuenta1,
        cuentaOrigen: idCuenta2,
        monto: monto,
        fecha: this.obtenerFechaActual(),
    };
      console.log(transferencia);
      this.transaction(transferencia).subscribe(resp => {
      this.transactionForm.reset();
      this.router.navigate(['/account-transactions']);
    });
      },
      (error) => {
        alert('El número de teléfono no está asociado a ninguna cuenta');
      }
    );
    
    }

    transaction(transferencia: any){
      return this.http.post<any>(this.API_SERVER2, transferencia);
    }

    obtenerFechaActual(): string {
      const fechaActual = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return fechaActual.toLocaleDateString('es-ES', options);
    }

}
