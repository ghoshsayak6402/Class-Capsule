import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from '../../services/data.service';
import { Assignment, Course } from '../../models/course.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  courses: Course[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
    });

    this.dataService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  getCourseTitle(courseId: string): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  getCourseColor(courseId: string): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.color : '#6B7280';
  }

  formatDueDate(date: Date): string {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  }

  isOverdue(date: Date): boolean {
    return date.getTime() < new Date().getTime();
  }

  submitAssignment(assignmentId: string) {
    this.dataService.updateAssignmentStatus(assignmentId, 'submitted');
  }
}