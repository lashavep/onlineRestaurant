// ProfileComponent
// გამოიყენება მომხმარებლის პროფილის ნახვისა და განახლებისთვის.
// AuthService.getProfile() იღებს მონაცემებს API-დან (/api/Users)
// AuthService.updateProfile() კი ანახლებს პროფილის ინფორმაციას.

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule, TranslateModule, CommonModule]
})
export class ProfileComponent implements OnInit {
  profile: any = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    zipcode: '',
    email: '',
    isSubscribedToPromo: false,
    role: ''
  };

  constructor(private authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
      console.log('Profile data:', data); // ✅ ნახე რეალურად რა მოდის
      this.profile = data;
    },
      error: () => Swal.fire({ title: 'Error', text: 'Failed to load profile', icon: 'error' })
    });
  }

  updateProfile() {
    this.authService.updateProfile(this.profile).subscribe({
      next: (res) => {
        Swal.fire('✔️', res.message || 'Profile updated!', 'success');
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.message || 'Update Failed';
        Swal.fire('❌', msg, 'error');
      }
    });
  }
  logPromo() {
    console.log('Promo subscription:', this.profile.isSubscribedToPromo);
  }

  deleteAccount() {
    Swal.fire({
      title: this.translate.instant('profile.DeleteConfirmTitle'),
      text: this.translate.instant('profile.DeleteConfirmText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('profile.YesDelete'),
      cancelButtonText: this.translate.instant('profile.Cancel')
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteMyAccount().subscribe({
          next: (res: { message: string }) => {
            Swal.fire('✔️', res.message || 'Account deleted!', 'success');
            this.authService.logout();   // ✅ JWT token წაშლა
            window.location.href = '/';  // ✅ redirect მთავარ გვერდზე
          },
          error: (err) => {
            const msg = (err.error as { message?: string })?.message || 'Delete Failed';
            Swal.fire('❌', msg, 'error');
          }
        });
      }
    });
  }
}
