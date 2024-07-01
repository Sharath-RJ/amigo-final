import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { environment } from '../../../../environment';


// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len:any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrl: './live-stream.component.css',
})
export class LiveStreamComponent implements OnInit {
  @ViewChild('root') root!: ElementRef;
  sharedLinks: any[] = [];
  user!: string;
  constructor(private _http: HttpClient) {}
  ngOnInit(): void {
    const user = sessionStorage.getItem('loginedInUser');
    if (user) this.user = JSON.parse(user).username;
  }
  ngAfterViewInit() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const userID = randomID(5);
    const userName = this.user;
    let role_str = getUrlParams(window.location.href).get('role') || 'Host';
    const role =
      role_str === 'Host'
        ? ZegoUIKitPrebuilt.Host
        : role_str === 'Cohost'
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      this.sharedLinks.push({
        name: 'Join as co-host',
        url:
          window.location.origin +
          window.location.pathname +
          '?roomID=' +
          roomID +
          '&role=Cohost',
      });
    }
    this.sharedLinks.push({
      name: 'Join as audience',
      url:
        window.location.origin +
        window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Audience',
    });

    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      console.log(
        'this.root.nativeElement',
        this.root.nativeElement.clientWidth
      );
      // start the call
      zp.joinRoom({
        container: this.root.nativeElement,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks: this.sharedLinks,
      });
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            this.addGoLiveButtonListener();
          }
        }
      });

      observer.observe(this.root.nativeElement, {
        childList: true,
        subtree: true,
      });
    });
  }

  addGoLiveButtonListener() {
    const goLiveButton =
      this.root.nativeElement.querySelector('#ZegoLiveButton'); // Adjust the selector based on the actual button
    if (goLiveButton) {
      goLiveButton.addEventListener('click', this.handleGoLive.bind(this));
    }
    const stopLiveButton = this.root.nativeElement.querySelector(
      '.TTgLs8cpg66Z6CXgHGVA'
    ); // Adjust the selector based on the actual button
    if (stopLiveButton) {
      stopLiveButton.addEventListener('click', this.handleStopLive.bind(this));
    }
  }

  handleGoLive() {
    const audienceLink = this.sharedLinks.find(
      (link: any) => link.name === 'Join as audience'
    )?.url;
    if (audienceLink) {
      console.log(audienceLink);
      this._http
        .put(`${environment.apiUrl}/user/goLive`, {
          livelink: audienceLink,
        })
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    console.log('go live button clicked');
  }
  handleStopLive(){
    
      this._http
        .put(`${environment.apiUrl}/user/stopLive`, {
          livelink: null,})
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    console.log('stop live button clicked');
  }
}
