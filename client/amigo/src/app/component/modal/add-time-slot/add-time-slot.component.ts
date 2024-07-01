import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-time-slot',
  templateUrl: './add-time-slot.component.html',
  styleUrl: './add-time-slot.component.css',
})
export class AddTimeSlotComponent {
  dayOfWeek: string = '';
  startTime: string = '';
  endTime: string = '';
  error: string = '';

  ampmOptions: string[] = ['AM', 'PM'];

  @Output() timeSlotAdded = new EventEmitter<{
    dayOfWeek: string;
    timeRange: string;
  }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private _snackBar: MatSnackBar) {}

  addTimeSlot() {
    if (!this.isValidTimeRange()) {

      this._snackBar.open(`${this.error}`, '', {
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'center', 
      });
      return;
    }
    const timeRange = `${this.formatTime(this.startTime)}-${this.formatTime(
      this.endTime
    )}`;
    this.timeSlotAdded.emit({
      dayOfWeek: this.dayOfWeek,
      timeRange: timeRange,
    });
    this.closeModal();
  }

  isValidTimeRange(): boolean {
    const start = new Date(`2000-01-01T${this.startTime}`);
    const end = new Date(`2000-01-01T${this.endTime}`);


    if(!this.dayOfWeek || !this.startTime || !this.endTime){
      this.error = 'All fields are required';
      return false;
    }

    // Check if start time is earlier than end time
    if (start >= end) {
      this.error = 'Start time must be earlier than end time';
      return false;
    }

    // Check if the duration is exactly one hour
    const duration = Math.abs(end.getTime() - start.getTime()) / 1000 / 60 / 60;
    if (duration !== 1) {
      this.error = 'Duration must be exactly one hour';
      return false;
    }

    return true;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';

    // Convert hours to 12-hour format with AM/PM
    if (parseInt(hours) === 0) {
      formattedTime = `12:${minutes} AM`; // Midnight
    } else if (parseInt(hours) === 12) {
      formattedTime = `12:${minutes} PM`; // Noon
    } else if (parseInt(hours) > 12) {
      formattedTime = `${parseInt(hours) - 12}:${minutes} PM`; // Afternoon/Evening
    } else {
      formattedTime = `${parseInt(hours)}:${minutes} AM`; // Morning
    }

    return formattedTime;
  }

 
}
