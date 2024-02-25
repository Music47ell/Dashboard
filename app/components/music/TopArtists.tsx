'use client'

import { default as Image } from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Artist = {
	name: string
	image: string
	url: string
}

export default function TopArtists(): JSX.Element {
	const topArtistsData = useSWR<Artist[]>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/listenbrainz/top-artists`,
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
				<div className="bg-nfh-accent-secondary/10 relative flex items-center gap-5 overflow-hidden p-4">
					<Image
						src={artist.image || '/images/brand/logo.png'}
						alt={artist.name}
						className="h-32 w-32"
						width={100}
						height={100}
						loading="lazy"
					/>
					<div>
						<p className="origin-left text-base font-semibold text-white md:text-xl">
							{artist.name}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
