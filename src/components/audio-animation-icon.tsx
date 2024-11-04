import Icon from '@ant-design/icons';
import React from 'react';

import AudioPlayingStep1  from './svgs/audio/audio-volume-level1.svg';
import AudioPlayingStep2 from './svgs/audio/audio-volume-level2.svg';
import AudioPlayingStep3 from './svgs/audio/audio-volume-level3.svg';
import AudioPlayingStep4  from './svgs/audio/audio-volume-level4.svg';
import AudioPlayingStep5 from './svgs/audio/audio-volume-level5.svg';
import AudioPlayingStep6  from './svgs/audio/audio-volume-level6.svg';
import AudioPlayingStep7  from './svgs/audio/audio-volume-level7.svg';
import AudioPlayingStep8 from './svgs/audio/audio-volume-level8.svg';
import AudioPlayingStep9 from './svgs/audio/audio-volume-level9.svg';

interface IconFontProps {
  className?: string;
  style?: React.CSSProperties;
  level?: number;
}

// Map of audio playing steps
const audioPlayingStepMap: Record<number, React.FC<React.SVGProps<SVGSVGElement>>> = {
  1: AudioPlayingStep1,
  2: AudioPlayingStep2,
  3: AudioPlayingStep3,
  4: AudioPlayingStep4,
  5: AudioPlayingStep5,
  6: AudioPlayingStep6,
  7: AudioPlayingStep7,
  8: AudioPlayingStep8,
  9: AudioPlayingStep9,
};

export const AudioAnimationIcon: React.FC<IconFontProps> = ({ className, style, level }) => {
  const sStyle: React.CSSProperties = {
    pointerEvents: 'none',
    ...(style || {}), // Merge provided styles with default styles
  };

  // Validate level and retrieve the corresponding icon component
  const IconComponent = level && level >= 1 && level <= 9 ? audioPlayingStepMap[level] : null;

  return IconComponent ? (
    <Icon
      className={className}
      component={IconComponent}
      viewBox="0 0 24 24"
      style={sStyle}
    />
  ) : null;
};
