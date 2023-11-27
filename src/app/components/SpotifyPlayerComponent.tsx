const SIZES = {
    normal: "232",
    compact: "152",
  };

type SpotifyPlayerComponentProps = {
    episode: string;
    size?: "normal" | "compact";
};

export function SpotifyPlayerComponent ({
    episode,
    size="compact"
}: SpotifyPlayerComponentProps) {
    return (
        <iframe
            src={`https://open.spotify.com/embed/episode/${episode}`}
            width="100%"
            height={SIZES[size]}
            allowTransparency={true}
            allow="encrypted-media"
            loading="lazy"
        />
    );

}

