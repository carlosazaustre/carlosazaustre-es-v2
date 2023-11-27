import { getTweet } from 'react-tweet/api';
import { EmbeddedTweet, TweetNotFound, type TweetProps } from 'react-tweet';

/**
 * Renders the content of a tweet.
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the tweet.
 * @param {Object} props.components - The components to be used for rendering.
 * @param {Function} props.onError - The error handler function.
 * @returns {JSX.Element} The rendered tweet content.
 */
const TweetContent = async ({ id, components, onError }: TweetProps) => {
    let error;
    const tweet = id
        ? await getTweet(id).catch(err => {
                if (onError) {
                    onError(err);
                } else {
                    console.error(err);
                    error = err;
                }
            })
        : undefined;

    if (!tweet) {
        const NotFound = components?.TweetNotFound || TweetNotFound;
        return <NotFound error={error} />;
    }

    return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

/**
 * Renders a tweet component.
 * @param {string} id - The ID of the tweet.
 * @returns {JSX.Element} The rendered tweet component.
 */
export async function TweetComponent({ id }: { id: string}) {
    return (
        <div className="tweet my-6">
            <div className="flex justify-center">
                <ReactTweet id={id} />
            </div>
        </div>
    );
}