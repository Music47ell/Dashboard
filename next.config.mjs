/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	eslint: {
		dirs: ['components', 'context', 'data', 'helpers', 'hooks', 'layouts', 'lib', 'pages', 'utils']
	},
	images: {
		domains: [
			'i.scdn.co',
			'image.tmdb.org', // TMDB TVShow/Movie Posters
			'assets.fanart.tv', // Fanart.tv TVShow/Movie/Artist Posters
			'coverartarchive.org' // MusicBrainz Album Cover
		]
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})

		return config
	}
}

export default nextConfig
