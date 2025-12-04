// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router'; // Importar NavigationEnd e Event
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'; // Importar o operador filter

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-brother-project'; // Ou o nome do seu projeto
  showSidebar: boolean = false; // Começa como false, será atualizado
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verifique a URL atual após o redirecionamento estar completo
      const currentUrl = event.urlAfterRedirects || event.url;
      if (currentUrl.startsWith('/auth/login') || currentUrl.startsWith('/auth/register')) {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
