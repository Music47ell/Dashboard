export type CodeStats = {
	total_xp: number
	previous_xp: number
	new_xp: number
	level: number
	user: string
	url: string
}

export type TLanguage = {
	ranking: number
	name: string
	xps: number
	progress: number
}

export type TraktRelease = {
	title: string
	link: string
	poster: string
	trailer: string
}

export type Episode = {
	name: string
	images: {
		url: string
	}
	show: {
		name: string
		images: {
			url: string
		}
	}
	external_urls: {
		spotify: string
	}
}

export type Track = {
	name: string
	artists: {
		name: string
	}[]
	album: {
		name: string
		images: {
			url: string
		}[]
	}
	external_urls: {
		spotify: string
	}
}

export type Song = {
	songUrl: string
	artist: string
	title: string
	album?: string
	albumImage: string
}

export type Podcast = {
	podcastUrl: string
	title: string
	show: string
	podcastImage: string
}

export type Trakt = {
	movies: {
		watched: number
		minutes: number
	}
	shows: {
		watched: number
	}
	episodes: {
		minutes: number
		watched: number
	}
	user: string
	url: string
}

export type TraktMovie = {
	movie: {
		ids: {
			tmdb: number
		}
		title: string
		link: string
		poster: string
	}
}

export type TraktShow = {
	show: {
		ids: {
			tmdb: number
		}
		title: string
		link: string
		poster: string
	}
}

export type Languages = {
	languages: Language[]
}

export type Language = {
	ranking: number
	name: string
	xps: number
}

export type Views = {
	views: number
}

export type PostView = {
	slug: string
	count: string
}

export type Lastfm = {
	user: {
		playcount: number
		artist_count: number
		track_count: number
		registered: {
			'#text': number
		}
		url: string
		name: string
	}
}

export type WebMention = {
	source: string
	verified: boolean
	verified_date: string
	private: boolean
	data: {
		author: {
			name: string
			url: string
			photo: string
		}
		url: string
		name: string
		content: string
		published: string
	}
	activity: {
		type: 'link' | 'reply' | 'repost' | 'like'
		sentence: string
		sentence_html: string
	}
	target: string
}

export type Toc = {
	value: string
	depth: number
	url: string
}[]
