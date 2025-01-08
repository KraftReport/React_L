// declare global {
//     interface Window {
//         VdoPlayer : object
//     }
// }
// export {}


declare global {
    interface Window {
      VdoPlayer?: new (options: {
        otp: string;
        playbackInfo: string;
        container: HTMLElement | null;
        theme?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) => any;
    }
  }
  