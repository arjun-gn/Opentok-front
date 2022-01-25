import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as OT from '@opentok/client';
import initLayoutContainer from 'opentok-layout-js';
import { environment } from 'src/environments/environment';
import { Session } from '../models/genereal.model';
import { FirebaseService } from '../services/firebase.service';
import { OpentokService } from '../services/opentok.service';
import { LAYOUT_OPTIONS } from './layout.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('meetingContainer') meetingContainer!: ElementRef<HTMLElement>;
  apiKey!: string;
  sessionId!: string;
  token!: string;
  session: any;
  publisher: any;
  callConnected: boolean = false;
  isVideoOn: boolean = true;
  isMicOn: boolean = true;
  startShare: boolean = false;
  startRecord: boolean = false;
  subscriber: any;
  screenShare: any;
  sessionData!: any;
  archiveResponse!: any;
  archiveId!: string;
  constructor(
    private firebaseService: FirebaseService,
    private opentokService: OpentokService
  ) {}

  ngOnInit(): void {
    var layoutContainer = document.getElementById('layoutContainer');
    // Initialize the layout container and get a reference to the layout method
    // var layout = initLayoutContainer(layoutContainer).layout;

    // this.addRecording();

    this.opentokService.getSession().subscribe((res) => {
      this.sessionData = res;
      this.sessionId = this.sessionData.sessionId;
      this.token = this.sessionData.token;
      this.apiKey = this.sessionData.apiKey;
      this.initializeSession();
    });
  }

  initializeSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    const callOptions = {
      subscribeToAudio: true,
      subscribeToVideo: true,
      insertMode: 'append',
    };
    // Subscribe to a newly created stream
    this.session.on('streamCreated', (event: any) => {
      console.log(event);
      this.adjustLayOut();

      this.subscriber = this.session.subscribe(
        event.stream,
        'videos',
        callOptions,
        this.handleError
      );
    });
  }

  adjustLayOut() {
    const layout = initLayoutContainer(this.meetingContainer.nativeElement, {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: false,
    });
    layout.layout();
  }

  toggleVideo() {
    if (!this.callConnected) {
      this.startCall();
    } else {
      this.isVideoOn = !this.isVideoOn;
      this.subscriber && this.subscriber.subscribeToVideo(this.isVideoOn);
    }
  }

  toggleMic() {
    if (!this.callConnected) {
      this.startCall();
      this.toggleVideo();
    } else {
      this.isMicOn = !this.isMicOn;
      this.subscriber && this.subscriber.subscribeToAudio(this.isMicOn);
    }
  }

  startCall() {
    this.callConnected = true;
    // Create a publisher
    this.publisher = OT.initPublisher(
      'videos',
      { insertMode: 'append' },
      (err) => {
        if (!err) {
          this.addSub();
        }
      }
    );
  }

  startScreenShare() {
    this.initializeScreenShare();
  }

  addSub() {
    this.session.connect(this.token, (error: any) => {
      // If the connection is successful, publish to the session
      if (error) {
        this.handleError(error);
      } else {
        this.session.publish(this.publisher, this.handleError);
        this.adjustLayOut();
      }
    });
  }

  stopShare() {
    this.screenShare.destroy();
    this.startShare = false;
  }

  record() {
    this.startRecord = !this.startRecord;
    if (this.startRecord == true) {
      this.opentokService.startArchiving().subscribe((res) => {
        this.archiveResponse = res;
        this.archiveId = this.archiveResponse.id;
        console.log(res);
      });
    } else {
      console.log(this.archiveId);

      this.opentokService.stopArchiving(this.archiveId).subscribe((res) => {
        console.log(res);
        this.archiveId = '';
      });
    }
  }

  endCall() {
    if (this.startRecord) this.record();
    this.publisher.destroy();
    this.session && this.session.disconnect();
    this.isMicOn = true;
    this.isVideoOn = true;
    this.callConnected = false;
    this.startShare = false;
    this.startRecord = false;
  }

  handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  initializeScreenShare() {
    OT.checkScreenSharingCapability((response) => {
      if (!response.supported || response.extensionRegistered === false) {
        // This browser does not support screen sharing.
        console.log('This browser does not support screen sharing.');
      } else if (response.extensionInstalled === false) {
        // Prompt to install the extension.
      } else {
        // Screen sharing is available. Publish the screen.

        this.screenShare = OT.initPublisher(
          'videos',
          { videoSource: 'screen', insertMode: 'append' },
          (error) => {
            if (error) {
              console.log(error);
            } else {
              this.session.publish(this.screenShare, (error: any) => {
                if (error) {
                  console.log(error);
                  // } else {
                }
                this.startShare = true;
              });
            }
          }
        );
      }
    });
  }

  addRecording() {
    this.firebaseService
      .create({ name: 'sad54654gd64s4ga45gs4dg3/archive.mp4' })
      .then(() => {
        console.log('Created new item successfully!');
      });
  }
}
