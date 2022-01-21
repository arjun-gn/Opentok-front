import { Component, OnInit } from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'openTok-T1';
  apiKey = '47430891';
  sessionId =
    '1_MX40NzQzMDg5MX5-MTY0Mjc2NDEwNDc0N35XZnJUa3plRTdPNFNGYjFuRUNUZFpocHR-fg';
  token =
    'T1==cGFydG5lcl9pZD00NzQzMDg5MSZzaWc9Y2IxMmU1YzA3YzZlNWUyNzUzNzBhMThlYzdkNGVkZDVjZjNmMGQxYTpzZXNzaW9uX2lkPTFfTVg0ME56UXpNRGc1TVg1LU1UWTBNalkxTWprM09URTNOWDV0WlRVMlZXUXdZamR1TUZCVVdVTm1XRU42YkRCR1pVbC1mZyZjcmVhdGVfdGltZT0xNjQyNzY0MTE3Jm5vbmNlPTAuNjU0NjkwMjQ3NDY1MTIzNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjQyNzg1NzE2JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  session: any;
  publisher: any;
  callConnected: boolean = false;
  isVideoOn: boolean = true;
  isMicOn: boolean = true;
  startShare: boolean = false;
  subscriber: any;

  ngOnInit(): void {
    var layoutContainer = document.getElementById('layoutContainer');
    // Initialize the layout container and get a reference to the layout method
    // var layout = initLayoutContainer(layoutContainer).layout;

    this.initializeSession();
  }
  toggleVideo() {
    this.isVideoOn = !this.isVideoOn;
    this.subscriber.subscribeToAudio(this.isVideoOn);

  }
  toggleMic() {
    this.isMicOn = !this.isMicOn;
    this.subscriber.subscribeToAudio(this.isMicOn);

    // this.publisher.publishAudio(false);
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
  endCall() {
    this.publisher.destroy();
    this.session.unpublish(this.publisher);
    this.session.disconnect();

    this.callConnected = false;
    this.startShare = false;
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

  stopShare() {}
  handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }
  initializeScreenShare() {
    OT.checkScreenSharingCapability((response) => {
      if (!response.supported || response.extensionRegistered === false) {
        // This browser does not support screen sharing.
      } else if (response.extensionInstalled === false) {
        // Prompt to install the extension.
      } else {
        // Screen sharing is available. Publish the screen.

        var publisher = OT.initPublisher(
          'screen-preview',
          { videoSource: 'screen', insertMode: 'append' },
          (error) => {
            if (error) {
              // Look at error.message to see what went wrong.
            } else {
              this.session.publish(publisher, (error: any) => {
                if (error) {
                  // Look error.message to see what went wrong.
                }
                this.startShare = true;
              });
            }
          }
        );
      }
    });
  }

  initializeSession() {
    this.session = OT.initSession(this.apiKey, this.sessionId);
    const callOptions = { subscribeToAudio: true, subscribeToVideo: false };
    // Subscribe to a newly created stream
    this.session.on('streamCreated', (event: any) => {
      this.subscriber = this.session.subscribe(
        event.stream,
        'layoutContainer',
        callOptions,
        this.handleError
      );
    });
    // this.subscriber.subscribeToAudio = false;
  }
}
