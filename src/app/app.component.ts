import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { User } from './models/user';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ChatsRUs';
  user: User | undefined;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((_event) => {
        this.user = this.authService.user;
        this.cdr.detectChanges();
      });
  }

  logoutHandler(): void {
    this.authService.user = undefined;
    this.user = undefined;

    this.router.navigateByUrl('/');
  }
}
