import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { Course } from '../../models/course.model';

interface StudentPerformance {
  name: string;
  course: string;
  grade: number;
  progress: number;
  avatar: string;
}

interface CourseProgress {
  name: string;
  completion: number;
  color: string;
}

interface Activity {
  title: string;
  description: string;
  time: string;
  type: 'submission' | 'grade' | 'assignment';
  status: 'completed' | 'pending' | 'graded';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedPeriod = 'month';
  selectedCourse = '';
  selectedReportType = 'overview';
  courses: Course[] = [];

  // Overview stats
  totalStudents = 156;
  activeCourses = 8;
  completedAssignments = 342;
  pendingAssignments = 28;
  averageGrade = 87;

  // Chart data
  courseProgress: CourseProgress[] = [
    { name: 'Advanced Mathematics', completion: 78, color: '#3B82F6' },
    { name: 'Computer Science', completion: 65, color: '#10B981' },
    { name: 'Digital Design', completion: 92, color: '#6366F1' },
    { name: 'Business Strategy', completion: 45, color: '#F59E0B' }
  ];

  topStudents: StudentPerformance[] = [
    {
      name: 'Jessica Rodriguez',
      course: 'Digital Design',
      grade: 96,
      progress: 92,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Alex Thompson',
      course: 'Computer Science',
      grade: 94,
      progress: 85,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'David Kim',
      course: 'Mathematics',
      grade: 91,
      progress: 78,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      course: 'Business Strategy',
      grade: 89,
      progress: 82,
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=100&h=100&fit=crop&crop=face'
    }
  ];

  recentActivity: Activity[] = [
    {
      title: 'Assignment Submitted',
      description: 'Jessica Rodriguez submitted "Design Portfolio Review"',
      time: '2 hours ago',
      type: 'submission',
      status: 'completed'
    },
    {
      title: 'Grade Posted',
      description: 'Calculus Problem Set #5 has been graded',
      time: '4 hours ago',
      type: 'grade',
      status: 'graded'
    },
    {
      title: 'New Assignment',
      description: 'Algorithm Implementation project assigned',
      time: '1 day ago',
      type: 'assignment',
      status: 'pending'
    },
    {
      title: 'Assignment Submitted',
      description: 'Alex Thompson submitted "Market Research Report"',
      time: '2 days ago',
      type: 'submission',
      status: 'completed'
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  getGradeClass(grade: number): string {
    if (grade >= 90) return 'excellent';
    if (grade >= 80) return 'good';
    return 'average';
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'submission': return 'upload';
      case 'grade': return 'grade';
      case 'assignment': return 'assignment';
      default: return 'info';
    }
  }
}