import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  private recognition: any;
  public text: string = '';
  

  constructor(private zone: NgZone, private http: HttpClient) {
    const { webkitSpeechRecognition }: any = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      this.zone.run(() => {
        this.text = event.results[0][0].transcript;
      });
    };
  }
  get recognitions() {
    return this.recognition;
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  clearText() {
    this.text = '';
  }
  sendTextToBackend(question: string) {
    return this.http.post<any>(`${environment.apiUrl}/amigo/analyze-text`, {
      question,
    });
  }

  setOnResult(callback: (event: any) => void): void {
    this.recognition.onresult = callback;
  }
}
