import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

import SectionHeading from '../SectionHeading'
import SectionSubHeading from '../SectionSubHeading'
import LastfmCard from './LastfmCard'
import RecentPodcasts from './RecentPodcasts'
import RecentTracks from './RecentTracks'
import TopAlbums from './TopAlbums'
import TopArtists from './TopArtists'

export default function Music() {
	return (
		<section className="flex flex-col gap-y-2">
			<div className="space-y-2 md:space-y-5">
				<SectionHeading title="Music Stats" />
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>My all time </span>
						<Link href={`https://www.last.fm/user/${siteMetadata.author.username}`}>Last.fm</Link>
						<span> stats.</span>
					</div>
				</SectionSubHeading>
				<div className="space-y-2 md:space-y-5">
					<Link
						href="/metalmagnet"
						className="inline-flex w-full items-center justify-center rounded bg-green-500 px-4 py-2 font-medium leading-5 !text-white"
					>
						Recommend me some music
					</Link>
				</div>
				<LastfmCard />
			</div>
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Most Recent Tracks</h3>
			<RecentTracks />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Monthly Top Albums</h3>
			<TopAlbums />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Monthly Top Artists</h3>
			<TopArtists />
			<h3 className="text-2xl font-bold leading-8 tracking-tight">Recent Podcasts</h3>
			<RecentPodcasts />
		</section>
	)
}
