'use client'

import { MediaCard } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type Movie = {
	title: string
	poster: string
	url: string
}

export default function MoviesWatched(): JSX.Element {
	const moviesData = useSWR<Movie[]>(`${siteMetadata.siteUrl}/api/watched/movies`, fetcher)

	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		if (moviesData.data) {
			setMovies(moviesData.data)
		}
	}, [moviesData.data])

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
}
