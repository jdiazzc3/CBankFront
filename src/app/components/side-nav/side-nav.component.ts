import { Component, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth: number;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  nombre: string = '';
  usuario: any;

  private API_SERVER = "http://localhost:8080/cuenta/usuario";


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.obtenerInfoUsuario();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }



  obtenerInfoUsuario(): void {
    console.log(localStorage.getItem('idCuenta'));
    this.http.get<string>(`${this.API_SERVER}/${localStorage.getItem('idCuenta')}`).subscribe(
      resp => {
        this.usuario = resp;
        console.log(this.usuario);
        this.nombre = this.usuario.nombre;     
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
  
}
