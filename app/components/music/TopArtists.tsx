'use client'

import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Artist = {
	title: string
	albumImage: string
	songUrl: string
}

export default function TopArtists(): JSX.Element {
	const topArtistsData = useSWR<Artist[]>(
		`${siteMetadata.siteUrl}/api/spotify/top-artists`,
		fetcher
	)

	const [topArtists, setTopArtists] = useState<Artist[]>([])

	useEffect(() => {
		if (topArtistsData.data) {
			setTopArtists(topArtistsData.data)
		}
	}, [topArtistsData.data])

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{topArtists.map((artist) => (
				<MediaCard
					key={artist.title}
					title={artist.title}
					image={artist.albumImage}
					url={artist.songUrl}
					source="Spotify"
				/>
			))}
		</div>
	)
}
