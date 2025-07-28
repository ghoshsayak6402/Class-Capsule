export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  studentsCount: number;
  progress: number;
  color: string;
  assignments: number;
  nextClass?: Date;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'teacher' | 'administrator' | 'alumni';
  profileImage?: string;
  department?: string;
  graduationYear?: number;
  courses: string[];
  overallProgress: number;
}