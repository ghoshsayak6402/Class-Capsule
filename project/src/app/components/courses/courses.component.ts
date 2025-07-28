import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  getSubjectIcon(title: string): string {
    if (title.toLowerCase().includes('math')) return '📐';
    if (title.toLowerCase().includes('computer') || title.toLowerCase().includes('programming')) return '💻';
    if (title.toLowerCase().includes('design')) return '🎨';
    if (title.toLowerCase().includes('business')) return '💼';
    return '📚';
  }
}