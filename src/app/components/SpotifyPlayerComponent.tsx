const SIZES = {
    normal: "232",
    compact: "152",
  };

const THEMES = {
    light: "?t=0",
    dark: "?theme=0&amp;t=0",
};

type SpotifyPlayerComponentProps = {
    episode: string;
    size?: "normal" | "compact";
    theme?: "light" | "dark";
};

export function SpotifyPlayerComponent ({ episode, size="compact", theme="light" }: SpotifyPlayerComponentProps) {
    return (
        <iframe
            src={`https://open.spotify.com/embed/episode/${episode}${THEMES[theme]}`}
            width="100%"
            height={SIZES[size]}
            allowTransparency={true}
            allow="encrypted-media"
        />
    );

}