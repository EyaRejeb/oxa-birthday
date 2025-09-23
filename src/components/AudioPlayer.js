import React, { forwardRef } from "react";

const AudioPlayer = forwardRef((props, ref) => (
  <audio ref={ref} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
));

export default AudioPlayer;
