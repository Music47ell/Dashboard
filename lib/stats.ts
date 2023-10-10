import siteMetadata from '@/data/siteMetadata'

type stats = {
	numberOfWords: number
	numberOfPosts: number
}

export const getContentStats = async () => {
	try {
		const response = await fetch(`${siteMetadata.siteUrl}/blog/feed.json`)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const data = await response.json()

		const numberOfPosts = data.items.length
		const numberOfWords = data.items.reduce(
			(acc: number, curr: { words_count: string }) => acc + parseInt(curr.words_count),
			0
		)

		const stats = {
			numberOfWords,
			numberOfPosts,
		}

		return stats as stats
	} catch (error) {
		throw new Error(`Error fetching JSON feed: ${error.message}`)
	}
}
