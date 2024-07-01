import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { RazorpayService } from '../../../services/razorpay.service';

declare var razorpay: any;  

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrl: './trainer-profile.component.css',
})
export class TrainerProfileComponent implements OnInit {
  trainerId!: string | null;
  trainerProfile: any;
  stripe!: Stripe | null;
  card: any;
  handler: any = null;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private razorpayService: RazorpayService
  ) {}
  selectedSlot!: any;
  async ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.trainerId = params.get('id');
    });


    this._http
      .get(`${environment.apiUrl}/trainer/getTrainerProfile/${this.trainerId}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.trainerProfile = data;
        },
        (err) => {
          console.log(err);
        }
      );

    this.loadStripe();
  
  }

  selectSlot(slot: string) {
    console.log('slooot', slot);
    this.selectedSlot = slot;
  }

  bookNow() {
   
    this._http
      .post(`${environment.apiUrl}/trainer/bookNow`, {
        slot: this.selectedSlot,
        trainerId: this.trainerId,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this._http
            .patch(
              `${environment.apiUrl}/trainer/updateSlot/${this.selectedSlot._id}`,
              { status: 'booked' }
            )
            .subscribe(
              (data: any) => {
                if (data.modifiedCount == 0) {
                  this._snackBar.open('Appointment Already Booked', '', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                  });
                }
                this._snackBar.open('Appointment Booked Successfully', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  pay(amount: string) {
     if (!this.selectedSlot) {
       return;
     }
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PWGZxRt3sCPNpRIJRxThlLsHAEuCknUkirKbupCKCRhmuJSMB4xoPO9raiK6YVyQ0Lg1UPF3sWELcYeDDvDry6X00iLFOfiV0',
      locale: 'auto',
      token: (token: any) => {
        // Use an arrow function to inherit 'this' context
        console.log('Token:', token);
        console.log(this.selectedSlot);
        this.bookNow(); // Now 'this' refers to the class instance
      },
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: Number(amount) * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PWGZxRt3sCPNpRIJRxThlLsHAEuCknUkirKbupCKCRhmuJSMB4xoPO9raiK6YVyQ0Lg1UPF3sWELcYeDDvDry6X00iLFOfiV0',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log('pppppppppppppppppppppppppppppppppp', token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }

  isBooked(slot: any): boolean {
    return slot.status === 'booked';
  }
}
