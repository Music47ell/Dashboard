/**
 * @type {import('next').NextConfig}
 **/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = () => {
	const plugins = [withBundleAnalyzer]
	return plugins.reduce((acc, next) => next(acc), {
		reactStrictMode: true,
		pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
		eslint: {
			dirs: [
				'components',
				'context',
				'data',
				'helpers',
				'hooks',
				'layouts',
				'lib',
				'pages',
				'utils',
			],
		},
		images: {
			domains: [
				'image.tmdb.org', // TMDB TVShow/Movie Posters
				'lastfm.freetls.fastly.net', // Last.fm Album Cover
			],
		},
		webpack: (config) => {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			})

			return config
		},

		async headers() {
			return [
				{
					source: '/(.*)',
					headers: securityHeaders,
				},
			]
		},

		async redirects() {
			const redirects = []

			redirects.push({
				source: '/.env',
				destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				permanent: false,
			})
			redirects.push({
				source: '/wp-login.php',
				destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				permanent: false,
			})
			redirects.push({
				source: '/wp-admin',
				destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				permanent: false,
			})

			return redirects
		},
	})
}

// https://securityheaders.com
// https://webbkoll.dataskydd.net/en/results?url=https%3A%2F%2Fnews47ell.com
// https://securityheaders.com/?q=https%3A%2F%2Fwww.news47ell.com%2F&followRedirects=on
// https://csp-evaluator.withgoogle.com/?csp=https://news47ell.com
// https://observatory.mozilla.org/analyze/news47ell.com
const ContentSecurityPolicy = `
  default-src 'self' data: *.twitter.com *.twimg.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:
  *.youtube.com
  *.twitter.com
  *.news47ell.com
  www.google-analytics.com
  adservice.google.ca
  adservice.google.com
  adservice.google.es
  adservice.google.it
  adservice.google.se
  adservice.google.de
  adservice.google.fr
  adservice.google.ru
  adservice.google.md
  adservice.google.be
  adservice.google.ch
  adservice.google.dk
  adservice.google.nl
  adservice.google.no
  adservice.google.pl
  adservice.google.ae
  adservice.google.at
  adservice.google.bg
  adservice.google.dz
  adservice.google.fi
  adservice.google.gr
  adservice.google.hr
  adservice.google.hu
  adservice.google.ie
  adservice.google.iq
  adservice.google.lv
  adservice.google.mk
  adservice.google.pt
  adservice.google.is
  adservice.google.kz
  adservice.google.cz
  adservice.google.gg
  adservice.google.com.ar
  adservice.google.com.sg
  adservice.google.co.jp
  adservice.google.com.cu
  adservice.google.co.uk
  adservice.google.co.kr
  adservice.google.com.mt
  adservice.google.co.id
  adservice.google.co.il
  adservice.google.co.in
  adservice.google.co.nz
  adservice.google.co.th
  adservice.google.co.za
  adservice.google.com.bh
  adservice.google.com.lb
  adservice.google.com.mx
  adservice.google.com.my
  adservice.google.com.ng
  adservice.google.com.pe
  adservice.google.com.pk
  adservice.google.com.sa
  adservice.google.com.tr
  adservice.google.com.tw
  adservice.google.com.ua
  adservice.google.com.au
  adservice.google.com.br
  adservice.google.com.hk
  adservice.google.co.ke
  adservice.google.co.ve
  adservice.google.com.gt
  adservice.google.com.kw
  adservice.google.com.mm
  adservice.google.com.pa
  *.googlesyndication.com
  www.googletagservices.com
  partner.googleadservices.com
  *.cloudflareinsights.com
  ;
  child-src 'self' *.youtube.com *.google.com *.twitter.com
  ;
  style-src 'self' 'unsafe-inline'
  *.news47ell.com
  *.twitter.com
  *.googleapis.com
  ;
  img-src * 'self' blob: data:
  *.twimg.com
  *.twitter.com
  webmention.io
  *.ytimg.com
  pagead2.googlesyndication.com
  ;
  media-src 'none'
  ;
  connect-src * 'self'
  *.twitter.com
  webmention.io
  news47ell.report-uri.com
	vitals.vercel-insights.com
  www.google-analytics.com
  adservice.google.com
  adservice.google.ru
  adservice.google.ch
  adservice.google.de
  adservice.google.it
  adservice.google.be
  adservice.google.at
  adservice.google.bg
  adservice.google.ca
  adservice.google.es
  adservice.google.fi
  adservice.google.fr
  adservice.google.ie
  adservice.google.mk
  adservice.google.no
  adservice.google.pl
  adservice.google.se
  adservice.google.cz
  adservice.google.dk
  adservice.google.gr
  adservice.google.hu
  adservice.google.nl
  adservice.google.ro
  adservice.google.com.sg
  adservice.google.com.cu
  adservice.google.co.uk
  adservice.google.com.mt
  adservice.google.co.id
  adservice.google.co.in
  adservice.google.com.au
  adservice.google.com.bh
  adservice.google.com.br
  adservice.google.com.pe
  adservice.google.com.pk
  adservice.google.com.tr
  adservice.google.com.ua
  adservice.google.co.nz
  adservice.google.com.ar
  adservice.google.com.gt
  adservice.google.com.mx
  csi.gstatic.com
  *.googlesyndication.com
  partner.googleadservices.com
  www.googletagservices.com
  *.cloudflareinsights.com
  ;
  font-src 'self' data:
  fonts.gstatic.com
  ;
  frame-src
  *.twitter.com
  *.youtube.com
  *.googlesyndication.com
  googleads.g.doubleclick.net
  ;
  report-uri
  https://news47ell.report-uri.com/r/d/csp/reportOnly
  ;
  report-to
  default
  ;
`

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: 'Content-Security-Policy-Report-Only',
		value: ContentSecurityPolicy.replace(/\n/g, ''),
	},
	{
		key: 'Content-Security-Policy-Report-Only',
		value: 'upgrade-insecure-requests',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	// https://httpsecurityreport.com/best_practice.html#hsts
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	// https://hstspreload.org/
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	//https://caniuse.com/mdn-http_headers_nel
	{
		key: 'NEL',
		value: `{"report_to":"default","max_age":31536000,"include_subdomains":true}`,
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	// Opt-out of Google FLoC: https://amifloced.org/
	//https://scotthelme.co.uk/goodbye-feature-policy-and-hello-permissions-policy/
	{
		key: 'Permissions-Policy',
		value:
			'ambient-light-sensor=(), autoplay=(), accelerometer=(self), camera=(), document-domain=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(self), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), vr=() interest-cohort=()',
	},
	{
		key: 'Report-To',
		value: `{"group":"default","max_age":31536000,"endpoints":[{"url":"https://news47ell.report-uri.com/a/d/g"}],"include_subdomains":true}`,
	},
]
