import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { Course } from '../../models/course.model';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: number;
  courseId: string;
  color: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting';
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentView: 'month' | 'week' | 'day' = 'month';
  currentDate = new Date();
  selectedCourse = '';
  courses: Course[] = [];
  events: CalendarEvent[] = [];
  calendarWeeks: CalendarDay[][] = [];
  currentWeekDays: any[] = [];
  upcomingEvents: CalendarEvent[] = [];

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.generateSampleEvents();
      this.generateCalendar();
      this.generateUpcomingEvents();
    });
  }

  generateSampleEvents() {
    const today = new Date();
    this.events = [
      {
        id: '1',
        title: 'Advanced Mathematics',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        time: '10:00 AM',
        duration: 90,
        courseId: '1',
        color: '#3B82F6',
        type: 'class'
      },
      {
        id: '2',
        title: 'CS Fundamentals Lab',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        time: '2:00 PM',
        duration: 120,
        courseId: '2',
        color: '#10B981',
        type: 'class'
      },
      {
        id: '3',
        title: 'Design Review',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
        time: '11:00 AM',
        duration: 60,
        courseId: '3',
        color: '#6366F1',
        type: 'meeting'
      },
      {
        id: '4',
        title: 'Midterm Exam',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        time: '9:00 AM',
        duration: 180,
        courseId: '1',
        color: '#EF4444',
        type: 'exam'
      },
      {
        id: '5',
        title: 'Project Submission',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
        time: '11:59 PM',
        duration: 0,
        courseId: '2',
        color: '#F59E0B',
        type: 'assignment'
      }
    ];
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarWeeks = [];
    let currentWeek: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayEvents = this.events.filter(event => 
        event.date.toDateString() === date.toDateString()
      );

      const calendarDay: CalendarDay = {
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: false,
        events: dayEvents
      };

      currentWeek.push(calendarDay);

      if (currentWeek.length === 7) {
        this.calendarWeeks.push(currentWeek);
        currentWeek = [];
      }
    }
  }

  generateUpcomingEvents() {
    const today = new Date();
    this.upcomingEvents = this.events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  }

  getCurrentPeriodTitle(): string {
    if (this.currentView === 'month') {
      return this.currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else if (this.currentView === 'week') {
      const startOfWeek = new Date(this.currentDate);
      startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return this.currentDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
      });
    }
  }

  previousPeriod() {
    if (this.currentView === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.generateCalendar();
  }

  nextPeriod() {
    if (this.currentView === 'month') {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.generateCalendar();
  }

  getCourseTitle(courseId: string): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  formatEventDate(date: Date): string {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getEventTop(time: string): number {
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    const adjustedHour = isPM && hour !== 12 ? hour + 12 : hour;
    return (adjustedHour - 8) * 60; // 8 AM is the start time
  }

  getEventHeight(duration: number): number {
    return duration; // 1 minute = 1 pixel
  }
}