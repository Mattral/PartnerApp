import React from 'react';
import Icon from '@ant-design/icons';
import IconAdvanced from './svgs/icon-advanced.svg';
import IconChat from './svgs/icon-chat.svg';
import IconGroup from './svgs/icon-group.svg';
import IconHeadset from './svgs/icon-headset.svg';
import IconMeeting from './svgs/icon-meeting.svg';
import IconPause from './svgs/icon-pause.svg';
import IconRemoteControl from './svgs/icon-remote-control.svg';
import IconResume from './svgs/icon-resume.svg';
import IconShare from './svgs/icon-share.svg';
import IconSpotlight from './svgs/icon-spotlight.svg';
import IconStart from './svgs/icon-start.svg';
import IconStop from './svgs/icon-stop.svg';
import IconPhone from './svgs/icon-phone.svg';
import IconPhoneOff from './svgs/icon-phone-off.svg';
import IconRecording from './svgs/icon-recording-default.svg';
import IconRecordingHovered from './svgs/icon-recording-hovered.svg';
import IconRecordingAnimated from './svgs/icon-recording-animated.svg';
import IconRecordingAnimatedHovered from './svgs/icon-recording-animated-hovered.svg';
import IconRecordingStop from './svgs/icon-recording-stop.svg';
import IconRecordingStopHovered from './svgs/icon-recording-stop-hovered.svg';
import IconRecordingResume from './svgs/icon-recording-resume.svg';
import IconRecordingResumeHovered from './svgs/icon-recording-resume-hovered.svg';
import IconRecordingPause from './svgs/icon-recording-pause.svg';
import IconRecordingPauseHovered from './svgs/icon-recording-pause-hovered.svg';
import IconLt from './svgs/icon-lt.svg';
import IconSubtitle from './svgs/icon-subtitles.svg';
import IconLeave from './svgs/icon-leave.svg';
import IconStopLeave from './svgs/icon-stop-leave.svg';
import IconControl from './svgs/icon-control.svg';
import IconSwitch from './svgs/icon-switch.svg';
import IconNetworkGood from './svgs/icon-network-good.svg';
import IconNetworkNormal from './svgs/icon-network-normal.svg';
import IconNetworkBad from './svgs/icon-network-bad.svg';
import IconLiveStream from './svgs/icon-live-stream.svg';
import IconLive from './svgs/icon-live.svg';
import IconMove from './svgs/icon-move.svg';
import IconAudioOn from './svgs/icon-audio-on.svg';
import IconAudioOff from './svgs/icon-audio-off.svg';
import IconReconnect from './svgs/icon-reconnect.svg';
import IconCorrectCircle from './svgs/icon-correct-circle.svg';
import IconDownload from './svgs/icon-download.svg';
import IconChatUpload from './svgs/icon-chat-upload.svg';
import IconPenddingCircle from './svgs/icon-pending-circle.svg';
import IconWarningCircle from './svgs/icon-warning-circle.svg';
import IconCorrect from './svgs/icon-correct.svg';
import IconLoading from './svgs/icon-loading.svg';
import IconParticipantAudioMuted from './svgs/participants/audio-muted.svg';
import IconParticipantAudioUnmuted from './svgs/participants/audio-unmuted.svg';
import IconParticipantAudioUnmutedAnimated from './svgs/participants/audio-unmuted-animated.svg';
import IconParticipantSharingDesktopAudio from './svgs/participants/sharing-desktop-audio.svg';
import IconParticipantSharingScreen from './svgs/participants/sharing-screen.svg';
import IconParticipantVideoOff from './svgs/participants/video-off.svg';
import IconParticipantVideoOn from './svgs/participants/video-on.svg';
import IconAudioMuted from './svgs/audio/audio-muted.svg';
import IconAudioUnmuted from './svgs/audio/audio-unmuted.svg';
import IconAudioDisallow from './svgs/audio/audio-disallow.svg';
import IconAudioNoDevices from './svgs/audio/audio-no-devices.svg';

const iconComponentMap: { [key: string]: any } = {
  'icon-advanced': IconAdvanced,
  'icon-chat': IconChat,
  'icon-group': IconGroup,
  'icon-headset': IconHeadset,
  'icon-meeting': IconMeeting,
  'icon-pause': IconPause,
  'icon-remote-control': IconRemoteControl,
  'icon-resume': IconResume,
  'icon-share': IconShare,
  'icon-spotlight': IconSpotlight,
  'icon-start': IconStart,
  'icon-stop': IconStop,
  'icon-recording': IconRecording,
  'icon-recording-hover': IconRecordingHovered,
  'icon-recording-stop': IconRecordingStop,
  'icon-recording-stop-hover': IconRecordingStopHovered,
  'icon-recording-resume': IconRecordingResume,
  'icon-recording-resume-hover': IconRecordingResumeHovered,
  'icon-recording-pause': IconRecordingPause,
  'icon-recording-pause-hover': IconRecordingPauseHovered,
  'icon-recording-animated': IconRecordingAnimated,
  'icon-recording-animated-hover': IconRecordingAnimatedHovered,
  'icon-phone': IconPhone,
  'icon-phone-off': IconPhoneOff,
  'icon-lt': IconLt,
  'icon-subtitle': IconSubtitle,
  'icon-leave': IconLeave,
  'icon-stop-leave': IconStopLeave,
  'icon-control': IconControl,
  'icon-switch': IconSwitch,
  'icon-network-good': IconNetworkGood,
  'icon-network-normal': IconNetworkNormal,
  'icon-network-bad': IconNetworkBad,
  'icon-live-stream': IconLiveStream,
  'icon-live': IconLive,
  'icon-move': IconMove,
  'icon-audio-on': IconAudioOn,
  'icon-audio-off': IconAudioOff,
  'icon-reconnect': IconReconnect,
  'icon-correct-circle': IconCorrectCircle,
  'icon-download': IconDownload,
  'icon-chat-upload': IconChatUpload,
  'icon-pendding-circle': IconPenddingCircle,
  'icon-warning-circle': IconWarningCircle,
  'icon-correct': IconCorrect,
  'icon-loading': IconLoading,
  'icon-participant-audio-muted': IconParticipantAudioMuted,
  'icon-participant-audio-unmuted': IconParticipantAudioUnmuted,
  'icon-participant-audio-unmuted-animated': IconParticipantAudioUnmutedAnimated,
  'icon-participant-sharing-desktop-audio': IconParticipantSharingDesktopAudio,
  'icon-participant-sharing-screen': IconParticipantSharingScreen,
  'icon-participant-video-off': IconParticipantVideoOff,
  'icon-participant-video-on': IconParticipantVideoOn,
  'icon-audio-muted': IconAudioMuted,
  'icon-audio-unmuted': IconAudioUnmuted,
  'icon-audio-disallow': IconAudioDisallow,
  'icon-audio-no-devices': IconAudioNoDevices
};

interface IconFontProps {
  type: string;
  style?: any;
}

export const IconFont = (props: IconFontProps) => {
  const { type, style } = props;
  const component = iconComponentMap[type];
  return component ? <Icon component={component} style={{ ...(style || {}) }} /> : null;
};
