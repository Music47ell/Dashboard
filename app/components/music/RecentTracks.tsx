import { MediaCard } from '@/components/UI'
import { getRecentTracks } from '@/lib/lastfm'
import { Song } from '@/lib/types'

const getRecentTenTracks = async () => {
	const { recenttracks: tracks } = await getRecentTracks()
	const recentTracks = tracks.track.filter((track) => track['@attr']?.nowplaying !== 'true')
		.filter((track) => track.image.find((image) => image.size === 'extralarge')?.['#text'] !== '')
		.map((track) => ({
			artist: track.artist['#text'],
			songUrl: track.url,
			title: track.name,
			album: track.album['#text'],
			albumImage: track.image.find((image) => image.size === 'extralarge')?.['#text']
		})).slice(0, 10) as Song[]

	return recentTracks
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const RecentTracks = asyncComponent(async () => {
	const recentTracks = await getRecentTenTracks()

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{recentTracks.map((track, index) => (
				<MediaCard key={index} title={track.title} image={track.albumImage} url={track.songUrl} />
			))}
		</div>
	)
})

export default RecentTracks
