import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

function App() {
  const [callStarted, setCallStarted] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     JitsiMeet.endCall();
  //   };
  // });

  const joinCall = () => {
    setTimeout(() => {
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
      const url = 'https://meet.jit.si/jitsidemo';
      const userInfo = {
        displayName: 'User',
        email: 'user@example.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      const meetFeatureFlags = {
        addPeopleEnabled: false,
        calendarEnabled: true,
        callIntegrationEnabled: true,
        chatEnabled: true,
        closeCaptionsEnabled: true,
        inviteEnabled: false,
        androidScreenSharingEnabled: false,
        liveStreamingEnabled: true,
        meetingNameEnabled: true,
        meetingPasswordEnabled: true,
        pipEnabled: true,
        kickOutEnabled: true,
        conferenceTimerEnabled: true,
        videoShareButtonEnabled: true,
        recordingEnabled: true,
        reactionsEnabled: true,
        raiseHandEnabled: true,
        tileViewEnabled: true,
        toolboxAlwaysVisible: false,
        toolboxEnabled: true,
        welcomePageEnabled: false,
      };
      setCallStarted(true);
      JitsiMeet.call(url, userInfo, meetFeatureFlags);
    }, 1000);
  };

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('terminate');
    setCallStarted(false);
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('Joined');
    setCallStarted(true);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('Will join');
  }
  return (
    <View style={{ flex: 1 }}>
      {callStarted ? (
        <JitsiMeetView
          onConferenceTerminated={e => onConferenceTerminated(e)}
          onConferenceJoined={e => onConferenceJoined(e)}
          onConferenceWillJoin={e => onConferenceWillJoin(e)}
          style={{
            flex: 1,
            height: '90%',
            width: '100%',
          }}
        />
      ) : (
        <TouchableOpacity
          style={{ marginTop: 50, padding: 20, alignItems: 'center' }}
          onPress={joinCall}>
          <Text>Join</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
export default App;
