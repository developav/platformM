declare module "react-youtube" {
  import React from "react";

  interface YouTubeProps {
    videoId: string;
    id?: string;
    className?: string;
    opts?: any;
    onReady?: (event: any) => void;
    onPlay?: (event: any) => void;
    onPause?: (event: any) => void;
    onEnd?: (event: any) => void;
    onError?: (event: any) => void;
    onStateChange?: (event: any) => void;
  }

  const YouTube: React.FC<YouTubeProps>;
  export default YouTube;
}