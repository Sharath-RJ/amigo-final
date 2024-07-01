import { Component, NgZone, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';

@Component({
  selector: 'app-talk-to-me',
  templateUrl: './talk-to-me.component.html',
  styleUrls: ['./talk-to-me.component.css'],
})
export class TalkToMeComponent implements OnInit {
  public isListening: boolean = false;
  public responseText: string = '';
  public isProcessing: boolean = false;
  utter: SpeechSynthesisUtterance;
  voices: SpeechSynthesisVoice[];

  constructor(
    public speechRecognitionService: SpeechRecognitionService,
    private zone: NgZone
  ) {
    this.utter = new SpeechSynthesisUtterance();
    this.utter.lang = 'en-US';
    this.voices = [];
  }

  ngOnInit() {
    this.loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = window.speechSynthesis.getVoices();
    console.log(this.voices);
    if (this.voices.length > 0) {
      // Set default voice or desired voice here
      this.utter.voice = this.voices.find(voice => voice.name === 'Google US English') || this.voices[0];
    }
  }

  startListening() {
    this.isListening = true;
    this.speechRecognitionService.clearText();
    this.speechRecognitionService.start();
    this.speechRecognitionService.recognitions.onend = () => {
      this.isListening = false;
      this.isProcessing = true;
      this.stopListening();
    };
  }

  stopListening() {
    this.speechRecognitionService.stop();
    this.speechRecognitionService
      .sendTextToBackend(this.speechRecognitionService.text)
      .subscribe(
        (response) => {
          this.isProcessing = false;
          console.log('Backend response:', response);
          this.zone.run(() => {
            this.responseText = response.answer;
            this.utter.text = this.responseText;
            window.speechSynthesis.speak(this.utter);
          });

          // Clear text
          this.speechRecognitionService.clearText();
        },
        (error) => {
          console.error('Error sending text to backend:', error);
          // Handle error as needed
        }
      );
  }
}
