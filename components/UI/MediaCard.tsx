import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'

type MediaCardProps = {
	source: string
	title: string
	image: string
	url?: string
}

export default function MediaCard({ source, title, image, url }: MediaCardProps) {
	return (
		<Link
			href={url}
			className="bg-nfh-accent-secondary/10 hover:bg-nfh-accent-secondary/30 relative flex items-center gap-5 overflow-hidden p-4"
		>
			{image && source === 'Spotify' ? (
				<Image
					src={image}
					alt={title}
					className="h-32 w-32"
					width={100}
					height={100}
					loading="lazy"
				/>
			) : source === 'trakt' ? (
				<Image
					src={image}
					alt={title}
					className="h-40 w-28"
					width={64}
					height={64}
					loading="lazy"
				/>
			) : (
				<div className="h-32 w-32 animate-pulse bg-white" />
			)}
			<div>
				<p className="origin-left text-base font-semibold text-white md:text-xl">{title}</p>
			</div>
		</Link>
	)
}
