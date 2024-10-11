import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { RegisterComponent } from './register/register.component';
import { ChannelsComponent } from './channels/channels.component';
import { UsersComponent } from './users/users.component';
import { ChannelDetailsComponent } from './channel-details/channel-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'channels', component: ChannelsComponent },
  { path: 'channels/detail', component: ChannelDetailsComponent },
  { path: 'users', component: UsersComponent },
];
