import siteMetadata from '@/data/siteMetadata'
import { displayNumbers } from '@/utils/formatters'
import OverviewItem from '../../components/OverviewItem'
/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const LastfmCard = asyncComponent(async () => {
	const stats = await fetch(`${siteMetadata.siteUrl}/api/stats/lastfm`, {
		next: {
			revalidate: 3600
		}
	}).then((res) => res.json())

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Account Age" value={stats.registeredDate} />
			<OverviewItem label="Artists" value={displayNumbers.format(stats.artistsCount)} />
			<OverviewItem label="Tracks" value={displayNumbers.format(stats.tracksCount)} />
			<OverviewItem label="Total Scrobbles" value={displayNumbers.format(stats.playCount)} />
			<OverviewItem label="Average Play" value={displayNumbers.format(stats.averagePlayCount)} />
		</div>
	)
})

export default LastfmCard
