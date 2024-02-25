'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { displayNumbers } from '@/utils/formatters'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OverviewItem from './../OverviewItem'

type ListenbrainzStats = {
	accountAge: number
	artistsCount: number
	tracksCount: number
	listensCount: number
	albumsCount: number
}

export default function ListenbrainzCard(): JSX.Element {
	const listenbrainzData = useSWR<ListenbrainzStats>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/listenbrainz/stats`,
		fetcher
	)

	const [listenbrainzStats, setListenbrainzStats] = useState<ListenbrainzStats>({
		accountAge: 0,
		artistsCount: 0,
		tracksCount: 0,
		listensCount: 0,
		albumsCount: 0
	})

	useEffect(() => {
		if (listenbrainzData.data) {
			setListenbrainzStats(listenbrainzData.data)
		}
	}, [listenbrainzData.data])

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Account Age" value={listenbrainzStats.accountAge} />
			<OverviewItem label="Artists" value={displayNumbers.format(listenbrainzStats.artistsCount)} />
			<OverviewItem label="Tracks" value={displayNumbers.format(listenbrainzStats.tracksCount)} />
			<OverviewItem
				label="Total Listens"
				value={displayNumbers.format(listenbrainzStats.listensCount)}
			/>
			<OverviewItem
				label="Albums Count"
				value={displayNumbers.format(listenbrainzStats.albumsCount)}
			/>
		</div>
	)
}
