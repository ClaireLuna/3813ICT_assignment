import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user: any;
  image: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user = this.authService.user;
    console.log(this.user);
  }

  uploadPicture = () => {
    console.log(this.image);
    if (!this.image) {
      return;
    }
    this.userService.updatePhoto(this.image).subscribe(
      (response) => {
        this.authService.user = this.user = response.body;
      },
      (error) => {
        console.error('Failed to upload photo', error);
      }
    );
  };

  private toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.image = await this.toBase64(file);

      console.log('Selected file:', file);
    }
  }
}
