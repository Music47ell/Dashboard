import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'

type MediaCardProps = {
	title: string
	image: string
	url: string
}

export default function MediaCard({ title, image, url }: MediaCardProps) {
	return (
		<Link
			href={url}
			className="relative flex items-center gap-5 overflow-hidden bg-nfh-accent-secondary/10 p-4 hover:bg-nfh-accent-secondary/30"
		>
			{image ? (
				<Image
					className="block w-auto"
					draggable={false}
					width={100}
					height={100}
					title={title}
					alt={title}
					src={image}
				/>
			) : (
				<div className="h-full w-full animate-pulse bg-white"></div>
			)}
			<div>
				<p className="origin-left text-base font-semibold text-white md:text-xl">{title}</p>
			</div>
		</Link>
	)
}
