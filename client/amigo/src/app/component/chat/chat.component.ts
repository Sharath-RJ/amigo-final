import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../services/socketio.service';
import { environment } from '../../../../environment';
import { ZIM } from 'zego-zim-web';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import * as recordrtc from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { _getShadowRoot } from '@angular/cdk/platform';
import { MatDialog } from '@angular/material/dialog';
import { FluencyTestComponent } from '../modal/fluency-test/fluency-test.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  content!: any;
  username!: string;
  userProfilePic!: string;
  userFilter: any = { username: '' };
  receiverId: string | null = null;
  senderId: string | null = null;
  messages: any = [];
  roomId!: string;
  chattedUsers: any = [];
  zp: any;
  resording: boolean = false;
  record: any;
  url!: string;
  isplaying: boolean = false;
  messageProgress: number[] = [];
  messageDurations: number[] = [];
  currentAudio: HTMLAudioElement | null = null;
  currentIndex: number | null = null;
  voiceSending: boolean = false;
  currentUserDetails: any = {};
  selectedUserId!: string | null;

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _http: HttpClient,
    private socketService: SocketService,
    private domsanitize: DomSanitizer,
    public dialog: MatDialog
  ) {}

  openModal(){
    const dialogRef = this.dialog.open(FluencyTestComponent)
  }
 
  playAudio(message: any, index: number) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isplaying = false;
      this.currentAudio = null;
      if (this.currentIndex === index) {
        return; // Toggle play/pause functionality
      }
    }

    this.currentAudio = new Audio(message.audioUrl);
    this.currentIndex = index;
    this.isplaying = true;
    this.currentAudio.load();
    this.currentAudio.play();

    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.messageDurations[index] = this.currentAudio!.duration * 1000; // Convert to milliseconds for Angular date pipe
    });

    this.currentAudio.addEventListener('timeupdate', () => {
      this.messageProgress[index] =
        (this.currentAudio!.currentTime / this.currentAudio!.duration) * 100;
      this.messageDurations[index] = this.currentAudio!.currentTime;
    });

    this.currentAudio.addEventListener('ended', () => {
      this.messageProgress[index] = 0;
    });
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) {
      return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }
  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  sanitize(url: string) {
    return this.domsanitize.bypassSecurityTrustUrl(url);
  }

  startRecording() {
    console.log('Starting recording...');
    this.resording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this))
      .catch(this.errorCallback.bind(this));
  }

  successCallback(stream: MediaStream) {
    console.log('Media stream obtained:', stream);
    const options: recordrtc.Options = {
      mimeType: 'audio/wav' as const, // Explicitly cast to the correct type
    };
    const StereoAudioRecorder = recordrtc.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    console.log('Recorder initialized:', this.record);
    console.log(this.record);
    this.record.record();
    console.log('Recording started');
  }

  stopRecording() {
    console.log('Stopping recording...');
    this.resording = false;
    this.record.stop(this.processingRecord.bind(this));

    console.log('Recording stopped');
  }

  processingRecord(blob: Blob) {
    this.voiceSending = true;
    console.log('Blob processed:', blob);
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');
    try {
      this._http
        .post(`${environment.apiUrl}/chat/Audioupload`, formData)
        .subscribe((response: any) => {
          console.log(response);
          this.url = response.fileUrl;
          this.socketService.sendMessage({
            sender: this.senderId,
            receiver: this.receiverId,
            audioUrl: this.url,
          });
          this._http
            .post(`${environment.apiUrl}/chat/send`, {
              sender: this.senderId,
              receiver: this.receiverId,
              audioUrl: this.url,
            })
            .subscribe(
              (data) => {
                this.voiceSending = false;
                console.log('Message sent successfully', data);
              },
              (error) => {
                console.error('Error sending message', error);
              }
            );
        });
      console.log('File uploaded, URL:', this.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  errorCallback(error: any) {
    console.log('Error:', error);
  }

  ngOnInit(): void {
    console.log('ngoninit called');
    this.route.paramMap.subscribe((params) => {
      const receiverIdParam = params.get('receiverId');
      this.receiverId = receiverIdParam !== null ? receiverIdParam : null;
      this.selectedUserId = this.receiverId;
      if (!this.receiverId) {
        console.warn('Receiver ID not found in route parameters');
      }
      console.log('Receiver ID inside ng oninit', this.receiverId);
      this.loadChatData();
    });

    //getting the current chated user details

    this._http
      .get(`${environment.apiUrl}/chat/currentUserDetails/${this.receiverId}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.currentUserDetails = data;
        },
        (error) => {
          console.error(error);
        }
      );

    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) {
      try {
        this.senderId = JSON.parse(loggedInUser)._id;
        this.username = JSON.parse(loggedInUser).username;
        this.userProfilePic = JSON.parse(loggedInUser).profilePic;
      } catch (e) {
        console.error('Error parsing loggedInUser from sessionStorage', e);
      }
    }
    console.log(this.senderId, ' ', this.receiverId, ' ', this.content);

    this._http
      .get(
        `${environment.apiUrl}/chat/getAllMessages/${this.senderId}/${this.receiverId}`
      )
      .subscribe(
        (data) => {
          this.messages = data;
        },
        (error) => {
          console.error(error);
        }
      );

    this._http
      .get(`${environment.apiUrl}/chat/getChatUsers/${this.senderId}`)
      .subscribe(
        (data) => {
          this.chattedUsers = data;
        },
        (error) => {
          console.error(error);
        }
      );

    if (this.senderId && this.receiverId) {
      this.socketService.joinRoom(this.receiverId);
      this.socketService.onNewMessage((message: any) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
      console.log('sender Id', this.senderId);
      console.log('receiver id', this.receiverId);
      const userID = this.senderId || '';
      console.log('userID', userID);
      const userName = 'Sender' + userID;
      const appID = 796494173;
      const serverSecret = '12bf1885a7a04712777878d75dc4fe86';
      const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        this.randomID(8),
        userID,
        userName
      );

      this.zp = ZegoUIKitPrebuilt.create(TOKEN);
      this.zp.addPlugins({ ZIM });
    }
  }

  loadChatData(): void {
    if (!this.senderId) {
      console.error('Sender ID is undefined');
      return;
    }

    if (!this.receiverId) {
      console.error('Receiver ID is undefined');
      return;
    }

    this._http
      .get(`${environment.apiUrl}/chat/currentUserDetails/${this.receiverId}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.currentUserDetails = data;
        },
        (error) => {
          console.error(error);
        }
      );

    this._http
      .get(
        `${environment.apiUrl}/chat/getAllMessages/${this.senderId}/${this.receiverId}`
      )
      .subscribe(
        (data) => {
          this.messages = data;
          this.scrollToBottom(); // Scroll to bottom after loading messages
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngAfterViewChecked() {
    //   this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatContainer && this.chatContainer.nativeElement) {
          this.chatContainer.nativeElement.scrollTop =
            this.chatContainer.nativeElement.scrollHeight;
        }
      }, 0);
    } catch (err) {
      console.error('Scroll to bottom error', err);
    }
  }

  sendMessage(): void {
    if (!this.senderId) {
      console.error('Sender ID is undefined');
      return;
    }

    if (!this.receiverId) {
      console.error('Receiver ID is undefined');
      return;
    }

    const message = {
      sender: this.senderId,
      receiver: this.receiverId,
      content: this.content,
    };

    this.socketService.sendMessage(message);

    this._http.post(`${environment.apiUrl}/chat/send`, message).subscribe(
      (data) => {
        this.content = '';
        console.log('Message sent successfully', data);
      },
      (error) => {
        console.error('Error sending message', error);
      }
    );
  }

  randomID(len: number): string {
    let result = '';
    const chars =
      '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  connectToVideoCall(): void {
    if (!this.zp) {
      console.error('ZegoUIKitPrebuilt is not initialized');
      return;
    }
    console.log('vc-> receriver id', this.receiverId);
    const targetUser = {
      userID: this.receiverId,
      userName: 'Receiver',
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

  checkGrammar() {
    this._http
      .post(`${environment.apiUrl}/chat/checkGrammar`, {
        content: this.content,
      })
      .subscribe(
        (data) => {
          console.log('Correct message', data);
          this.content = data;
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
  }
}
