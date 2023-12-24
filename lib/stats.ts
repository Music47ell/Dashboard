import siteMetadata from '@/data/siteMetadata'
import parseXml from '@/utils/parseXml'

type stats = {
	numberOfWords: number
	numberOfPosts: number
}

export const getContentStats = async () => {
	try {
		const response = await fetch(`${siteMetadata.siteUrl}/blog/feed.xml`)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const xml = await response.text()
		const parsedXml = parseXml(xml)

		if (!parsedXml) {
			throw new Error(`Error parsing XML feed`)
		}

		const { postCount: numberOfPosts, wordCount: numberOfWords } = parsedXml

		const stats = {
			numberOfWords,
			numberOfPosts,
		}

		return stats as stats
	} catch (error) {
		throw new Error(`Error fetching JSON feed: ${error.message}`)
	}
}
