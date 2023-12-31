type Props = {
  width?: number;
  color?: string;
};

export function BackwardIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z" />
    </svg>
  );
}
export function ChevronLeftIcon({ width, color }: Props) {
  return (
    <svg width={width || "24px"} fill={color || "#fff"} viewBox="0 0 24 24">
      <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
  );
}

export function PlayIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 65 65">
      <g id="Group_38215" data-name="Group 38215" transform="translate(30 35)">
        <g
          id="play-button-arrowhead_1_"
          data-name="play-button-arrowhead (1)"
          transform="translate(-30 -35)"
        >
          <path
            id="Path_18"
            data-name="Path 18"
            d="M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z"
            transform="translate(-8.107 0)"
          />
        </g>
      </g>
    </svg>
  );
}

export function PauseIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>
  );
}

export function ForwardIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14M11.5,3C14.15,3 16.55,4 18.4,5.6L21,3V10H14L16.62,7.38C15.23,6.22 13.46,5.5 11.5,5.5C7.96,5.5 4.95,7.81 3.9,11L1.53,10.22C2.92,6.03 6.85,3 11.5,3Z" />
    </svg>
  );
}

export function AspectRatioIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M19,12H17V15H14V17H19V12M7,9H10V7H5V12H7V9M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M21,19H3V5H21V19Z" />
    </svg>
  );
}

export function FullscreenIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" />
    </svg>
  );
}

export function SettingIcon({ width, color }: Props) {
  return (
    <svg fill={color || "white"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    </svg>
  );
}
