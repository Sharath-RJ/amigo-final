import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form classes
import { environment } from '../../../../../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-profile-form',
  templateUrl: './trainer-profile-form.component.html',
  styleUrls: ['./trainer-profile-form.component.css'],
})
export class TrainerProfileFormComponent implements OnInit {
  profileForm!: FormGroup; // Define your reactive form group

  showAddTimeSlotModal: boolean = false;
  timeSlots: { dayOfWeek: string; timeRange: string }[] = [];

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private fb: FormBuilder // Inject FormBuilder for form creation
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      bio: [''],
      specialization: [''],
      experience: [0],
      qualifications: [''],
      timeZone: [''],
      hourlyRate: [0],
    });
  }

  openAddTimeSlotModal() {
    this.showAddTimeSlotModal = true;
  }

  closeAddTimeSlotModal() {
    this.showAddTimeSlotModal = false;
  }

  onTimeSlotAdded(slot: { dayOfWeek: string; timeRange: string }) {
    this.timeSlots.push(slot);
    this.closeAddTimeSlotModal();
  }

  completeProfile() {
    if (this.profileForm.valid) {
      this._http
        .post<{ profileComplete: boolean }>(
          `${environment.apiUrl}/trainer/completeProfile`,
          {
            ...this.profileForm.value,
            AvailableSlots: this.timeSlots,
          }
        )
        .subscribe(
          (data) => {
            if (data.profileComplete) {
              this._router.navigate(['/TrainerDashboard']);
            }
          },
          (err) => {
            console.error(err);
          }
        );
    } else {
      this.validateAllFormFields(this.profileForm);
    }
  }

  // Function to mark all fields as touched to trigger error messages
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
