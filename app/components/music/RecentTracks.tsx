'use client'

import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Track = {
	title: string
	albumImage: string
	songUrl: string
}

export default function RecentTracks(): JSX.Element {
	const recentTracksData = useSWR<Track[]>(`${siteMetadata.siteUrl}/api/recent/tracks`, fetcher)

	const [recentTracks, setRecentTracks] = useState<Track[]>([])

	useEffect(() => {
		if (recentTracksData.data) {
			setRecentTracks(recentTracksData.data)
		}
	}, [recentTracksData.data])

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentTracks.map((track) => (
				<MediaCard
					key={track.title}
					title={track.title}
					image={track.albumImage}
					url={track.songUrl}
					source="Spotify"
				/>
			))}
		</div>
	)
}
