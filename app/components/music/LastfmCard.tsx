'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { displayNumbers } from '@/utils/formatters'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OverviewItem from './../OverviewItem'

type LastfmStats = {
	registeredDate: string
	artistsCount: number
	tracksCount: number
	playCount: number
	averagePlayCount: number
}

export default function LastfmCard(): JSX.Element {
	const lastfmData = useSWR<LastfmStats>(`${siteMetadata.siteUrl}/api/lastfm/stats`, fetcher)

	const [lastfmStats, setLastfmStats] = useState<LastfmStats>({
		registeredDate: '',
		artistsCount: 0,
		tracksCount: 0,
		playCount: 0,
		averagePlayCount: 0
	})

	useEffect(() => {
		if (lastfmData.data) {
			setLastfmStats(lastfmData.data)
		}
	}, [lastfmData.data])

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Account Age" value={lastfmStats.registeredDate} />
			<OverviewItem label="Artists" value={displayNumbers.format(lastfmStats.artistsCount)} />
			<OverviewItem label="Tracks" value={displayNumbers.format(lastfmStats.tracksCount)} />
			<OverviewItem label="Total Scrobbles" value={displayNumbers.format(lastfmStats.playCount)} />
			<OverviewItem
				label="Average Play"
				value={displayNumbers.format(lastfmStats.averagePlayCount)}
			/>
		</div>
	)
}
