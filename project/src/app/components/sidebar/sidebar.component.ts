import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, User } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentUser: User | null = null;
  isDarkMode = false;
  selectedProfile: string = 'teacher';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    // Set initial profile based on current user
    if (this.currentUser) {
      this.selectedProfile = this.currentUser.role;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchProfile(role: string): void {
    // Create a temporary user with the selected role for demo purposes
    const demoUsers = {
      student: {
        id: 'demo-student',
        email: 'student@demo.com',
        name: 'Alex Student',
        role: 'student' as const,
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
        department: 'Computer Science'
      },
      teacher: {
        id: 'demo-teacher',
        email: 'teacher@demo.com',
        name: 'Dr. Sarah Johnson',
        role: 'teacher' as const,
        profileImage: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=100&h=100&fit=crop&crop=face',
        department: 'Mathematics'
      },
      administrator: {
        id: 'demo-admin',
        email: 'admin@demo.com',
        name: 'Michael Admin',
        role: 'administrator' as const,
        profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face'
      },
      alumni: {
        id: 'demo-alumni',
        email: 'alumni@demo.com',
        name: 'Jessica Alumni',
        role: 'alumni' as const,
        profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face',
        department: 'Business Administration',
        graduationYear: 2020
      }
    };

    const selectedUser = demoUsers[role as keyof typeof demoUsers];
    if (selectedUser) {
      // Update the auth service with the demo user
      this.authService.setDemoUser(selectedUser);
      this.selectedProfile = role;
    }
  }

  getRoleDisplayName(role?: string): string {
    const roleNames = {
      'student': 'Student',
      'teacher': 'Teacher',
      'administrator': 'Administrator',
      'alumni': 'Alumni'
    };
    return role ? roleNames[role as keyof typeof roleNames] || role : '';
  }
}