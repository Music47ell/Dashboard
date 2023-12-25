import { getTopLanguages } from '@/lib/codestats'
import { get_level, get_level_progress } from '@/utils/level-calc'

import Progress from './Progress'

const getCodeStatsTopLanguages = async () => {
	const data = await getTopLanguages()

	const languages = [] as { name: string; xps: number; level: number; percent: number }[]
	// combine JavaScript (JSX) and TypeScript (JSX) into one and combine their xps
	const jsXps = data.languages['JavaScript (JSX)'].xps
	const tsXps = data.languages['TypeScript (JSX)'].xps
	languages.push({
		name: 'React',
		xps: jsXps + tsXps,
		level: get_level(jsXps + tsXps),
		percent: get_level_progress(jsXps + tsXps)
	})
	data.languages['JavaScript·(JSX)'] = undefined
	data.languages['TypeScript (JSX)'] = undefined
	for (const language in data.languages) {
		if (data.languages[language] !== undefined) {
			languages.push({
				name: language,
				xps: data.languages[language].xps,
				level: get_level(data.languages[language].xps),
				percent: get_level_progress(data.languages[language].xps)
			})
		}
	}

	// Object.keys(data.languages).forEach((language) => {
	// 	const xps = data.languages[language].xps
	// 	languages.push({
	// 		name: language,
	// 		xps: xps,
	// 		level: get_level(xps),
	// 		percent: get_level_progress(xps),
	// 	})
	// })

	const sortedLanguages = languages
		.sort((a, b) => b.xps - a.xps)
		.slice(0, 10)
		.map((language) => {
			return {
				name: language.name,
				xps: language.xps,
				level: language.level,
				percent: language.percent
			}
		})

	return sortedLanguages
}

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopLanguages = asyncComponent(async () => {
	const sortedLanguages = await getCodeStatsTopLanguages()

	return (
		<div className="relative flex flex-1 flex-col gap-2 rounded-lg bg-gradient-to-r from-nfh-accent-secondary to-nfh-accent-primary p-[2px]">
			<div className="h-full w-full rounded-lg bg-nfh-background-primary p-2">
				<p className="absolute -top-3 left-3 bg-nfh-background-primary px-2">
					Top Programming Languages I use
				</p>
				<div className="grid gap-2 px-4 py-3">
					{sortedLanguages.map((language) => (
						<Progress
							key={language.name}
							data={language}
							className="bg-gradient-to-r from-nfh-accent-secondary to-nfh-accent-primary"
						/>
					))}
				</div>
			</div>
		</div>
	)
})

export default TopLanguages
