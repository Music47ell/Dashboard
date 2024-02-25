'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OverviewItem from '../../components/OverviewItem'

type CodestatsStats = {
	level: number
	total_xp: number
	new_xp: number
	previous_xp: number
}

export default function CodestatsCard(): JSX.Element {
	const codestatsData = useSWR<CodestatsStats>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/codestats/stats`,
		fetcher
	)

	const [codestatsStats, setCodestatsStats] = useState<CodestatsStats>({
		level: 0,
		total_xp: 0,
		new_xp: 0,
		previous_xp: 0
	})

	useEffect(() => {
		if (codestatsData.data) {
			setCodestatsStats(codestatsData.data)
		}
	}, [codestatsData])

	return (
		<div className="mb-1 grid gap-3 py-2 md:grid-cols-2">
			<OverviewItem label="Level" value={codestatsStats.level} />
			<OverviewItem label="Total XP" value={codestatsStats.total_xp} />
			<OverviewItem label="Increased by" value={codestatsStats.new_xp} />
			<OverviewItem label="From" value={codestatsStats.previous_xp} />
		</div>
	)
}
