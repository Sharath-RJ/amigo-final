import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css'],
})
export class VideocallComponent implements OnInit, AfterViewInit {
  roomId!: string;
  zp!: any;

  constructor(private _route: ActivatedRoute) {}

  @ViewChild('root', { static: true }) root!: ElementRef;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.roomId = params['roomId'];
      console.log(this.roomId);
    });
  }

  ngAfterViewInit(): void {
    const userID = '796494173'; // Make sure this is a string
    const userName = 'userName' + userID;
    const appID = 0;
    const serverSecret = '12bf1885a7a04712777878d75dc4fe86';
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      userID,
      userName
    );

    this.zp = ZegoUIKitPrebuilt.create(TOKEN);
    this.zp.addPlugins({ ZIM });
  }

  invite() {
    const targetUser = {
      userID: '',
      userName: '',
    };

    this.zp
      .sendCallInvitation({
        callees: [targetUser],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
      })
      .then((res: any) => {
        console.warn(res);
      })
      .catch((err: any) => {
        console.warn(err);
      });
  }
}
