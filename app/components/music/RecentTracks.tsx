import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const RecentTracks = asyncComponent(async () => {
	const recentTracksData = await fetch(`${siteMetadata.siteUrl}/api/recent/tracks`, {
		next: {
			revalidate: 3600
		}
	})

	const recentTracks = await recentTracksData.json()

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
})

export default RecentTracks
