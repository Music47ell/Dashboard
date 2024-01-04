'use client'

import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Show = {
	title: string
	poster: string
	url: string
}

export default function ShowsWatched(): JSX.Element {
	const showsData = useSWR<Show[]>(`${siteMetadata.siteUrl}/api/watched/shows`, fetcher)

	const [shows, setShows] = useState<Show[]>([])

	useEffect(() => {
		if (showsData.data) {
			setShows(showsData.data)
		}
	}, [showsData.data])

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{shows.map((show) => (
				<MediaCard
					key={show.title}
					title={show.title}
					image={show.poster}
					url={show.url}
					source="trakt"
				/>
			))}
		</div>
	)
}
