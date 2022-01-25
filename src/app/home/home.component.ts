import { Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiKey = '47430891';
  sessionId =
    '1_MX40NzQzMDg5MX5-MTY0MzA4NDk2NTg1MH5HTnVMbk5SbERqZm5IbGlGNi9IWjBaZ25-fg';
  token =
    'T1==cGFydG5lcl9pZD00NzQzMDg5MSZzaWc9MTlmZWZhZDg2MWM5ODQ2NjA3MWE5NzllZDdhNGRjNWQ4YTU2NWRmYTpzZXNzaW9uX2lkPTFfTVg0ME56UXpNRGc1TVg1LU1UWTBNekE0TkRrMk5UZzFNSDVIVG5WTWJrNVNiRVJxWm01SWJHbEdOaTlJV2pCYVoyNS1mZyZjcmVhdGVfdGltZT0xNjQzMDg0OTkzJm5vbmNlPTAuMTA1MDg3NjczNTEyNjE4NzImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY0MzEwNjU5MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
  session: any;
  publisher: any;
  callConnected: boolean = false;
  isVideoOn: boolean = true;
  isMicOn: boolean = true;
  startShare: boolean = false;
  startRecord: boolean = false;
  subscriber: any;
  screenShare: any;
  ngOnInit(): void {
    var layoutContainer = document.getElementById('layoutContainer');
    // Initialize the layout container and get a reference to the layout method
    // var layout = initLayoutContainer(layoutContainer).layout;

    this.initializeSession();
    // this.addRecording();
  }

  constructor(private firebaseService: FirebaseService) {}

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
      'publisher',
      { insertMode: 'append' },
      this.handleError
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
      }
    });
  }

  stopShare() {
    this.screenShare.destroy();
    this.startShare = false;
  }

  record() {
    this.startRecord = !this.startRecord;
    //recording api
  }

  endCall() {
    this.publisher.destroy();
    // this.session && this.session.unpublish(this.publisher);
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
          'screen-preview',
          { videoSource: 'screen', insertMode: 'append' },
          (error) => {
            if (error) {
              console.log(error);
            } else {
              this.session.publish(this.screenShare, (error: any) => {
                if (error) {
                  console.log(error);
                  // } else {
                  this.startShare = true;
                }
              });
            }
          }
        );
      }
    });
  }

  initializeSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    const callOptions = { subscribeToAudio: true, subscribeToVideo: true };
    // Subscribe to a newly created stream
    this.session.on('streamCreated', (event: any) => {
      console.log(
        '/////////' + event.stream.id,
        event.stream.name,
        event.stream.videoType,
        event.stream.layoutClassList
      );

      this.subscriber = this.session.subscribe(
        event.stream,
        'layoutContainer',
        callOptions,
        this.handleError
      );
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
