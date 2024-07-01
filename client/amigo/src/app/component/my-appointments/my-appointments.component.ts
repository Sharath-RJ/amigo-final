import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css',
})
export class MyAppointmentsComponent implements OnInit {
  constructor(private _http: HttpClient, private _snakebar: MatSnackBar) {}
  myAppointments: any[] = [];
  p: number = 1;
  totalUsers: any;
  
  ngOnInit(): void {
    // get all my appointments

    this._http
      .get<any[]>(`${environment.apiUrl}/user/getMyAppointments`)
      .subscribe(
        (data) => {
          this.myAppointments = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  joinMeet(link: string, day:string, time:string) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getDay()];
    const currentTime = currentDate.getHours() 
   
     if (currentDay !== day) {
       this._snakebar.open('This meeting is on ' + day, '', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' });
       return;
     }
    const time24=this.convertTo24HourFormat(time)
    alert(typeof time24[0]);
    if(currentTime < Number(time24[0])) {
      this._snakebar.open('The meeting not started yet', '', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' });
      return
    }

    if(currentTime > Number(time24[1])){
      this._snakebar.open('The meeting has ended', '', { duration: 2000 , verticalPosition: 'top', horizontalPosition: 'center'});
      return
    }
    window.open(link, '_blank');
  }

 convertTo24HourFormat(timeRange: string) {
    return timeRange.split('-').map(time => {
        let [timeStr, period] = time.trim().split(' ');
        let [hours, minutes] = timeStr.split(':').map(Number);
        
        if (period.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12;
        } else if (period.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });
}

}
