import React, { useRef, useState } from "react";
import "./ModalPlayer.scss";

interface VideoPlayerProps {
  src: string; // URL видео
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const value = Number(e.target.value);
    videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
    setProgress(value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (videoRef.current) videoRef.current.volume = value;
    setVolume(value);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={src}
        className="video-player__video"
        onTimeUpdate={handleTimeUpdate}
        controls={false} // отключаем стандартные кнопки
      />
      <div className="video-player__controls">
        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;