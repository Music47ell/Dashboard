import siteMetadata from '@/data/siteMetadata'
import OverviewItem from '../../components/OverviewItem'

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const CodeStatsCard = asyncComponent(async () => {
	const stats = await fetch(`${siteMetadata.siteUrl}/api/stats/codestats`, {
		next: {
			revalidate: 3600
		}
	}).then((res) => res.json())

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Level" value={stats.level} />
			<OverviewItem label="Total XP" value={stats.total_xp.toLocaleString('en')} />
			<OverviewItem label="Increased by" value={stats.new_xp.toLocaleString('en')} />
			<OverviewItem label="From" value={stats.previous_xp.toLocaleString('en')} />
		</div>
	)
})

export default CodeStatsCard
