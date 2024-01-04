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

export default function TopAlbums(): JSX.Element {
	const topTracksData = useSWR<Track[]>(`${siteMetadata.siteUrl}/api/top/tracks`, fetcher)

	const [topTracks, setTopTracks] = useState<Track[]>([])

	useEffect(() => {
		if (topTracksData.data) {
			setTopTracks(topTracksData.data)
		}
	}, [topTracksData.data])

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{topTracks.map((track) => (
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
