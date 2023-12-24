import countWords from './countWords'

export default function parseXml(
	xml: string
): { postCount: number; wordCount: number } | undefined {
	const contentStartTag = '<content:encoded>'
	const contentEndTag = '</content:encoded>'
	const itemStartTag = '<item>'

	let postCount = 0
	let wordCount = 0

	let startIdx = xml.indexOf(itemStartTag)

	while (startIdx !== -1) {
		const endIdx = xml.indexOf('</item>', startIdx)
		if (endIdx !== -1) {
			const itemContent = xml.substring(startIdx, endIdx)

			const contentIdx = itemContent.indexOf(contentStartTag)
			if (contentIdx !== -1) {
				const content = itemContent.substring(
					contentIdx + contentStartTag.length,
					itemContent.indexOf(contentEndTag)
				)
				wordCount += countWords(content)
				postCount++
			}
			startIdx = xml.indexOf(itemStartTag, endIdx + 1)
		} else {
			break
		}
	}

	return postCount > 0 ? { postCount, wordCount } : undefined
}
