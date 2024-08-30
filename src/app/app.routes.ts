import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';

export const routes: Routes = [
  { title: 'login', path: '', component: LoginComponent },
  { title: 'groups', path: 'groups', component: GroupsComponent },
];
