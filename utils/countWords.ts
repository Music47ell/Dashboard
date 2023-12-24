export default function countWords(content: string): number {
	const words = content.split(/\s+/)
	return words.length
}
