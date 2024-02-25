'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Progress from './Progress'

type Language = {
	name: string
	color: string
	percent: number
}

export default function TopLanguages(): JSX.Element {
	const topLanguagesData = useSWR<Language[]>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/codestats/top-languages`,
		fetcher
	)

	const [topLanguages, setTopLanguages] = useState<Language[]>([])

	useEffect(() => {
		if (topLanguagesData.data) {
			setTopLanguages(topLanguagesData.data)
		}
	}, [topLanguagesData.data])

	return (
		<div className="from-nfh-accent-secondary to-nfh-accent-primary relative flex flex-1 flex-col gap-2 rounded-lg bg-gradient-to-r p-[2px]">
			<div className="bg-nfh-background-primary h-full w-full rounded-lg p-2">
				<p className="bg-nfh-background-primary absolute -top-3 left-3 px-2">
					Top Programming Languages I use
				</p>
				<div className="grid gap-2 px-4 py-3">
					{topLanguages.map((language) => (
						<Progress
							key={language.name}
							data={language}
							className="from-nfh-accent-secondary to-nfh-accent-primary bg-gradient-to-r"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
