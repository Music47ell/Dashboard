'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OverviewItem from '../../components/OverviewItem'

type TraktStats = {
	episodes: {
		watched: number
		minutes: number
	}
	movies: {
		watched: number
		minutes: number
	}
	shows: {
		watched: number
	}
}

export default function TraktCard(): JSX.Element {
	const traktData = useSWR<TraktStats>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/trakt/stats`,
		fetcher
	)

	const [traktStats, setTraktStats] = useState<TraktStats>({
		episodes: {
			watched: 0,
			minutes: 0
		},
		movies: {
			watched: 0,
			minutes: 0
		},
		shows: {
			watched: 0
		}
	})

	useEffect(() => {
		if (traktData.data) {
			setTraktStats(traktData.data)
		}
	}, [traktData.data])

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem
				label="Total Days"
				value={traktStats.episodes.minutes + traktStats.movies.minutes / 60 / 24}
			/>
			<OverviewItem label="Shows" value={traktStats.shows.watched} />
			<OverviewItem label="Movies" value={traktStats.movies.watched} />
			<OverviewItem label="Days spent on shows" value={traktStats.episodes.minutes / 60 / 24} />
			<OverviewItem label="Days spent on movies" value={traktStats.movies.minutes / 60 / 24} />
			<OverviewItem label="Episodes watched" value={traktStats.episodes.watched} />
		</div>
	)
}
