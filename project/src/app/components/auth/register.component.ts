import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;
  graduationYears: number[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      department: [''],
      graduationYear: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Generate graduation years (current year - 50 to current year + 10)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear + 10; year >= currentYear - 50; year--) {
      this.graduationYears.push(year);
    }

    // Watch role changes to conditionally show fields
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.updateFieldValidators(role);
    });
  }

  updateFieldValidators(role: string) {
    const departmentControl = this.registerForm.get('department');
    const graduationControl = this.registerForm.get('graduationYear');

    if (role === 'alumni') {
      departmentControl?.setValidators([Validators.required]);
      graduationControl?.setValidators([Validators.required]);
    } else if (role === 'student' || role === 'teacher') {
      departmentControl?.setValidators([Validators.required]);
      graduationControl?.clearValidators();
    } else {
      departmentControl?.clearValidators();
      graduationControl?.clearValidators();
    }

    departmentControl?.updateValueAndValidity();
    graduationControl?.updateValueAndValidity();
  }

  showDepartmentField(): boolean {
    const role = this.registerForm.get('role')?.value;
    return role === 'student' || role === 'teacher' || role === 'alumni';
  }

  showGraduationField(): boolean {
    const role = this.registerForm.get('role')?.value;
    return role === 'alumni';
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password, name, role, department, graduationYear } = this.registerForm.value;
      
      this.authService.register(email, password, name, role, department, graduationYear).subscribe({
        next: (success) => {
          this.loading = false;
          if (success) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}