'use client'

import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Show = {
	title: string
	podcastImage: string
	podcastUrl: string
}

export default function RecentPodcasts(): JSX.Element {
	const recentPodcastsData = useSWR<Show[]>(
		`${siteMetadata.siteUrl}/api/spotify/subscribed-podcasts`,
		fetcher
	)

	const [recentPodcasts, setRecentPodcasts] = useState<Show[]>([])

	useEffect(() => {
		if (recentPodcastsData.data) {
			setRecentPodcasts(recentPodcastsData.data)
		}
	}, [recentPodcastsData.data])

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentPodcasts.map((show) => (
				<MediaCard
					key={show.title}
					title={show.title}
					image={show.podcastImage}
					url={show.podcastUrl}
					source="Spotify"
				/>
			))}
		</div>
	)
}
