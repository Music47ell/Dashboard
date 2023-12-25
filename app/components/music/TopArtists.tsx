import { MediaCard } from '@/components/UI'
import { getTopArtists } from '@/lib/spotify'
import { Song } from '@/lib/types'

const getTopTenArtists = async () => {
	const { items } = await getTopArtists()
	const topArtists = items.map((artist) => ({
		artist: artist.name,
		songUrl: artist.external_urls.spotify,
		audioUrl: artist.preview_url,
		title: artist.name,
		albumImage: artist.images[0].url
	})) as Song[]

	return topArtists
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopArtists = asyncComponent(async () => {
	const topArtists = await getTopTenArtists()

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
})

export default TopArtists
