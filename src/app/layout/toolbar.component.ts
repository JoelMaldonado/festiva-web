import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import Swal from 'sweetalert2';
import { StorageService } from '../core/services/storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [ToolbarModule, ButtonModule, RouterModule, NgIf],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  router = inject(Router);
  storageService = inject(StorageService);

  isMenuOpen = signal(false);

  items = [
    {
      label: 'Artists',
      icon: 'pi pi-fw pi-users',
      routerLink: 'artists',
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      routerLink: 'events',
    },
    {
      label: 'Clubs',
      icon: 'pi pi-fw pi-building',
      routerLink: 'clubs',
    },
    {
      label: 'Panel Admin',
      icon: 'pi pi-fw pi-cog',
      routerLink: 'panel-admin',
    },
  ];

  navigate(routerLink: String) {
    this.router.navigate(['menu', routerLink]);
  }

  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storageService.removeToken();
        this.router.navigate(['login']);
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
