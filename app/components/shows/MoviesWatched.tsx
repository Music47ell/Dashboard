import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const MoviesWatched = asyncComponent(async () => {
	const movies = await fetch(`${siteMetadata.siteUrl}/api/watched/movies`, {
		next: {
			revalidate: 3600
		}
	}).then((res) => res.json())

	return (
		<div className="grid gap-2 md:grid-cols-2">
			{movies.map((movie) => (
				<MediaCard
					key={movie.title}
					title={movie.title}
					image={movie.poster}
					url={movie.url}
					source="trakt"
				/>
			))}
		</div>
	)
})

export default MoviesWatched
