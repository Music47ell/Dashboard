import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const ShowsWatched = asyncComponent(async () => {
	const showsData = await fetch(`${siteMetadata.siteUrl}/api/watched/shows`, {
		next: {
			revalidate: 3600
		}
	})

	const shows = await showsData.json()

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{shows.map((show) => (
				<MediaCard
					key={show.title}
					title={show.title}
					image={show.poster}
					url={show.url}
					source="trakt"
				/>
			))}
		</div>
	)
})

export default ShowsWatched
