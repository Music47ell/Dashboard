import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function HCard(): JSX.Element {
	return (
		<div className="p-author h-card user-profile relative my-2 flex items-center rounded-md border border-nfh-accent-primary bg-nfh-background-secondary p-2 text-sm">
			<Link href="/" className="[&>img]:rounded-md" aria-label={siteMetadata.title} rel="author">
				<Image
					className="photo u-photo"
					src={siteMetadata.author.avatar}
					alt={siteMetadata.author.name}
					title={siteMetadata.author.name}
					width={64}
					height={64}
				/>
			</Link>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				<Link className="u-email font-medium" href={`mailto:${siteMetadata.email}`} rel="me authn">
					<p className="p-name text-sm font-medium">{siteMetadata.author.name}</p>
				</Link>
				<Link className="u-url u-uid font-medium" href={siteMetadata.siteUrl}>
					<p className="p-nickname text-sm font-medium">{siteMetadata.author.username}</p>
				</Link>
				<p className="p-role role text-sm font-medium">{siteMetadata.author.occupation}</p>
				<p className="p-country-name text-sm font-medium">{siteMetadata.author.location.country}</p>
				<div className="absolute right-1.5 top-1.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="47"
						height="31"
						viewBox="0 0 47 31"
						fill="none"
						className="p-country-flag inline"
					>
						<title>{siteMetadata.author.location.country}</title>
						<path fill="#E30A17" d="M47 0H0V31H47V0Z" />
						<path
							fill="#FFFFFF"
							d="M16.6 23.3C21 23.3 24.5 19.8 24.5 15.5 24.5 11.2 21 7.8 16.6 7.8 12.3 7.8 8.8 11.2 8.8 15.5 8.8 19.8 12.3 23.3 16.6 23.3Z"
						/>
						<path
							fill="#E30A17"
							d="M18.6 21.7C22.1 21.7 24.9 18.9 24.9 15.5 24.9 12.1 22.1 9.3 18.6 9.3 15.1 9.3 12.3 12.1 12.3 15.5 12.3 18.9 15.1 21.7 18.6 21.7Z"
						/>
						<path fill="#FFFFFF" d="M22.8 15.5L29.9 17.8 25.6 11.8V19.2L29.9 13.2 22.8 15.5Z" />
					</svg>
				</div>
				<p className="p-note note sr-only">
					My name is Ahmet. I'm Full Stack Developer from Türkiye 🇹🇷. This site is where I conduct
					all my experiments, and share my thoughts and ideas.
				</p>
			</div>
		</div>
	)
}
