// https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-library-read%20user-top-read%20user-read-recently-played
// curl -H "Authorization: Basic <base64 encoded client_id:client_secret>" -d grant_type=authorization_code -d code=<code> -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token
// import 'server-only'
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const RECENT_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=10'
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?limit=10'
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?limit=10'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const RECENT_PODCAST_ENDPOINT =
	'https://api.spotify.com/v1/me/player/recently-played?limit=10&type=episode'
const SHOWS_ENDPOINT = 'https://api.spotify.com/v1/me/shows?limit=10&offset=0'

export const getClientCredentialToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${basic}`
		}
	})

	return response.json()
}

export const getAccessToken = async () => {
	const searchParams = new URLSearchParams()
	searchParams.append('grant_type', 'refresh_token')
	searchParams.append('refresh_token', refresh_token as string)

	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: searchParams.toString()
	})

	return response.json()
}

type RecentTracks = {
	items: {
		track: {
			name: string
			artists: {
				name: string
			}[]
			album: {
				name: string
				images: { url: string }[]
			}
			external_urls: {
				spotify: string
			}
			preview_url: string
		}
	}[]
}

export const getRecentTracks = async () => {
	const { access_token } = await getAccessToken()
	const response = await fetch(RECENT_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 60 }
	})
	const recentTracks = (await response.json()) as RecentTracks

	return recentTracks
}

type TopTracks = {
	items: {
		name: string
		artists: {
			name: string
		}[]
		album: {
			name: string
			images: { url: string }[]
		}
		external_urls: {
			spotify: string
		}
		preview_url: string
	}[]
}

export const getTopTracks = async () => {
	const { access_token } = await getAccessToken()

	const response = await fetch(TOP_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 60 }
	})
	const topTracks = (await response.json()) as TopTracks

	return topTracks
}

type TopArtists = {
	items: {
		name: string
		artists: {
			name: string
		}
		images: {
			url: string
		}[]
		external_urls: {
			spotify: string
		}
		preview_url: string
	}[]
}

export const getTopArtists = async () => {
	const { access_token } = await getAccessToken()

	const response = await fetch(TOP_ARTISTS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 60 }
	})
	const topArtists = (await response.json()) as TopArtists

	return topArtists
}

type RecentPodcasts = {
	items: {
		episode: {
			name: string
			show: {
				name: string
				images: { url: string }[]
			}
			external_urls: {
				spotify: string
			}
			audio_preview_url: string
		}
	}[]
}

export const getRecentPodcasts = async () => {
	const { access_token } = await getAccessToken()
	const response = await fetch(RECENT_PODCAST_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 60 }
	})
	const recentPodcasts = (await response.json()) as RecentPodcasts

	return recentPodcasts
}

type SubscribedShows = {
	items: {
		show: {
			name: string
			publisher: string
			images: { url: string }[]
			external_urls: {
				spotify: string
			}
		}
	}[]
}

export const getSubscribedShows = async () => {
	const { access_token } = await getAccessToken()
	const response = await fetch(SHOWS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`
		},
		next: { revalidate: 60 }
	})
	const subscribedShows = (await response.json()) as SubscribedShows

	return subscribedShows
}
