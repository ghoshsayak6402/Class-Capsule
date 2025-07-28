import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Course, Assignment } from '../../models/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: Course[] = [];
  recentAssignments: Assignment[] = [];
  totalCourses = 0;
  totalStudents = 0;
  pendingAssignments = 0;
  averageProgress = 0;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dataService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.totalCourses = courses.length;
      this.totalStudents = courses.reduce((sum, course) => sum + course.studentsCount, 0);
      this.averageProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
    });

    this.dataService.getAssignments().subscribe(assignments => {
      this.recentAssignments = assignments.slice(0, 5);
      this.pendingAssignments = assignments.filter(a => a.status === 'pending').length;
    });

    // Update data when user changes
    this.authService.currentUser$.subscribe(user => {
      // Refresh dashboard data when user role changes
      this.updateDashboardForRole(user?.role);
    });
  }

  updateDashboardForRole(role?: string) {
    // Adjust dashboard data based on user role
    if (role === 'student') {
      this.totalCourses = 4; // Student enrolled courses
      this.totalStudents = 0; // Students don't see other students count
      this.pendingAssignments = 3; // Student's pending assignments
    } else if (role === 'administrator') {
      this.totalCourses = 25; // All courses in system
      this.totalStudents = 450; // All students in system
      this.pendingAssignments = 89; // All pending assignments
    } else if (role === 'alumni') {
      this.totalCourses = 0; // Alumni don't have active courses
      this.totalStudents = 0; // Alumni don't see student counts
      this.pendingAssignments = 0; // Alumni don't have assignments
    }
  }

  getCourseTitle(courseId: string): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  formatNextClass(date: Date): string {
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  }

  getDashboardTitle(): string {
    const user = this.authService.currentUserValue;
    const roleNames = {
      'student': 'Student Dashboard',
      'teacher': 'Teacher Dashboard',
      'administrator': 'Admin Dashboard',
      'alumni': 'Alumni Dashboard'
    };
    return user?.role ? roleNames[user.role as keyof typeof roleNames] || 'Dashboard' : 'Dashboard';
  }

  getDashboardSubtitle(): string {
    const user = this.authService.currentUserValue;
    const subtitles = {
      'student': 'Track your courses, assignments, and academic progress.',
      'teacher': 'Manage your classes, students, and course materials.',
      'administrator': 'Oversee system operations and user management.',
      'alumni': 'Stay connected with your alma mater and fellow graduates.'
    };
    return user?.role ? subtitles[user.role as keyof typeof subtitles] || 'Welcome back!' : 'Welcome back!';
  }
}