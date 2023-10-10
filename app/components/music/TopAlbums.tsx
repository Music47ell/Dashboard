import { MediaCard } from '@/components/UI'
import { getTopAlbums } from '@/lib/lastfm'
import { Song } from '@/lib/types'

const getTopTenAlbums = async () => {
	const { topalbums } = await getTopAlbums()
	const topAlbums = topalbums.album.map((track) => ({
		artist: track.artist.name,
		songUrl: track.url,
		title: track.name,
		album: track.name,
		albumImage: track.image.find((image) => image.size === 'extralarge')?.['#text'],
	})).slice(0, 10) as Song[]

	return topAlbums
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopAlbums = asyncComponent(async () => {
	const topAlbums = await getTopTenAlbums()

	return (
		<div className="grid gap-2 py-2 md:grid-cols-2">
			{topAlbums.map((track, index) => (
				<MediaCard key={index} title={track.title} image={track.albumImage} url={track.songUrl} />
			))}
		</div>
	)
})

export default TopAlbums
