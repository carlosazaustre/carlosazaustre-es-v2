const YouTubeVideo = ({ videoId }: { videoId: string }) => {
    return (
            <iframe
                className="w-full aspect-video rounded-lg"
                width="630"
                height="354"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
                loading='lazy'
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
    );
}

type YouTubeComponentProps = {
    size?: string,
    title?: string,
    description?: string,
    videoId: string
};

export function YouTubeComponent ({
    size,
    title,
    description,
    videoId
}: YouTubeComponentProps) {
    return (
        <div className="flex bg-gray-200 flex-col items-center border rounded-lg p-2">
            {title && <h4 className="text-lg font-bold">{title}</h4>}
            <YouTubeVideo videoId={videoId} />
            {description && <p className="text-sm">{description}</p>}
            <a className="no-underline" href="https://youtube.com/carlosazaustre?sub_confirmation=1">
                <div className="p-4 pb-2 items-center text-gray-500 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full text-white bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Suscríbete</span>
                    <span className="font-semibold mr-2 text-left flex-auto">No te pierdas ningún vídeo del canal</span>
                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                </div>
            </a>
        </div>
    )
}
