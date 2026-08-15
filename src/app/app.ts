import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  mostrarMenu = signal(true);

  constructor(private roteador: Router) {
    this.roteador.events
      .pipe(filter((evento) => evento instanceof NavigationEnd))
      .subscribe((evento) => {
        const url = (evento as NavigationEnd).urlAfterRedirects;
        this.mostrarMenu.set(!url.includes('/login'));
      });
  }
}
