import fs from "fs";
import path from "path";

type Metadata = {
	title: string;
	date: string;
	summary?: string;
	tags?: Array<string>;
	image?: string;
};

/**
 * Parses the frontmatter of a file and extracts the metadata and content.
 * @param fileContent The content of the file.
 * @returns An object containing the parsed metadata and content.
 */
function parseFrontmatter(fileContent: string) {
	let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	let match = frontmatterRegex.exec(fileContent);
	let frontMatterBlock = match && match[1]; // Add null check here
	let content = fileContent.replace(frontmatterRegex, "").trim();
	let frontMatterLines = frontMatterBlock?.trim().split("\n");
	let metadata: Partial<Metadata> = {};

	frontMatterLines?.forEach((line) => {
		let [key, ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		metadata[key.trim() as keyof Metadata] = value;
	});

	return { metadata: metadata as Metadata, content };
}

/**
 * Retrieves an array of MDX files from the specified directory.
 * @param dir - The directory to search for MDX files.
 * @returns An array of MDX file names.
 */
function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Reads the content of an MDX file and parses the frontmatter.
 * @param filePath - The path to the MDX file.
 * @returns The parsed frontmatter.
 */
function readMDXFile(filePath: string) {
	let rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

/**
 * Extracts the tweet IDs from the given content.
 * @param content The content to extract tweet IDs from.
 * @returns An array of tweet IDs extracted from the content.
 */
function extractTweetIds(content: string) {
	let tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
	return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)?.[0]) || [];
}

/**
 * Retrieves the MDX data from the specified directory.
 * @param dir - The directory path where the MDX files are located.
 * @returns An array of objects containing the metadata, slug, tweetIds, and content of each MDX file.
 */
function getMDXData(dir: string) {
	let mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		let { metadata, content } = readMDXFile(path.join(dir, file));
		let slug = path.basename(file, path.extname(file));
		let tweetIds = extractTweetIds(content);
		return {
			metadata,
			slug,
			tweetIds,
			content,
		};
	});
}

/**
 * Retrieves the blog posts from the content directory.
 * @returns {Promise<any>} A promise that resolves to the blog post data.
 */
export function getBlogPosts() {
	return getMDXData(path.join(process.cwd(), "src/content"));
}
