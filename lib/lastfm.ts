import 'server-only'

import siteMetadata from '@/data/siteMetadata'
import { Lastfm, RecentTracks, TopAlbums } from '@/lib/types'
const LASTFM_API_KEY = process.env.LASTFM_API_KEY


const NOW_PLAYING_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
const STATS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json`
const TOP_ALBUMS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${siteMetadata.author.username}&period=7day&api_key=${LASTFM_API_KEY}&format=json&limit=20`
const RECENT_TRACKS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${siteMetadata.author.username}&api_key=${LASTFM_API_KEY}&format=json&limit=20`

export const getStats = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(STATS_ENDPOINT)

	const stats = (await response.json()) as Lastfm

	return stats
}

export const getNowPlaying = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}

	const response = await fetch(NOW_PLAYING_ENDPOINT)

	const nowPlaying = (await response.json()) as RecentTracks

	return nowPlaying
}

export const getTopAlbums = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(TOP_ALBUMS_ENDPOINT)

	const stats = (await response.json()) as TopAlbums

	return stats
}

export const getRecentTracks = async () => {
	if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
		throw new Error(`No Trakt API key found!`)
	}
	const response = await fetch(RECENT_TRACKS_ENDPOINT)

	const stats = (await response.json()) as RecentTracks

	return stats
}
