import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SpeechRecognitionService } from '../../../services/speech-recognition.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
interface Feedback {
    text: string;
    analysis: {
      english_sentence_structures: string;
      filler_and_repetitive_words: string;
      fluency_score: string;
      feedback_for_improvement: string[];
    };
  };


@Component({
  selector: 'app-fluency-test',
  templateUrl: './fluency-test.component.html',
  styleUrl: './fluency-test.component.css',
})
export class FluencyTestComponent {
  public isListening: boolean = false;
  public text: string = '';
  public feedback: Feedback ={ 
    text: '',
    analysis: {
      english_sentence_structures: '',
      filler_and_repetitive_words: '',
      fluency_score: '',
      feedback_for_improvement: [],
    },
  };

  constructor(
    public dialogRef: MatDialogRef<FluencyTestComponent>,
    private _http: HttpClient,
  
  ) {}



  close(): void {
    this.dialogRef.close();
  }

  startListening(): void {
    this.isListening = true;

     const recognition: any = new (window as any).webkitSpeechRecognition(); // create speech recognition object

    // set up recognition settings
    recognition.lang = 'en-US'; // language for speech recognition
    recognition.continuous = true; // continue listening until stopped

    recognition.onresult = (event: any) => {
      // handle speech recognition results
      const transcript = event.results[event.results.length - 1][0].transcript;
      this.text += transcript; // append recognized text
      console.log('Transcript: ', this.text); // Debug log
    };

    recognition.onerror = (event:any) => {
      console.error('Speech recognition error:', event.error);
      this.stopListening(); // stop listening on error
    };

    recognition.onend = () => {
      if (this.isListening) {
        recognition.start(); // restart if still listening
      }
    };

    recognition.start(); // start listening
  }

  stopListening(): void {
     this.isListening = false;
     console.log("tttttttttttttttttttttttttttttttttttttttt",this.text);

     //checking fluency of the text
     this._http
       .post(`${environment.apiUrl}/amigo/checkFluency`, {
         voice: this.text,
       })
       .subscribe(
         (data:any) => {
            console.log (typeof data)
          
           this.feedback = data;
         },
         (error) => {
           console.log(error);
         }
       );
  
  }
}
