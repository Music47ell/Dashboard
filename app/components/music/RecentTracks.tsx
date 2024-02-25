'use client'

import { default as Image } from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Track = {
	title: string
	image: string
	songUrl: string
}

export default function RecentTracks(): JSX.Element {
	const recentTracksData = useSWR<Track[]>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/listenbrainz/recent-tracks`,
		fetcher
	)

	const [recentTracks, setRecentTracks] = useState<Track[]>([])

	useEffect(() => {
		if (recentTracksData.data) {
			setRecentTracks(recentTracksData.data)
		}
	}, [recentTracksData.data])

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentTracks.map((track) => (
				<div className="bg-nfh-accent-secondary/10 relative flex items-center gap-5 overflow-hidden p-4">
					<Image
						src={track.image || '/images/brand/logo.png'}
						alt={track.title}
						className="h-32 w-32"
						width={100}
						height={100}
						loading="lazy"
					/>
					<div>
						<p className="origin-left text-base font-semibold text-white md:text-xl">
							{track.title}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
