'use client'

import siteMetadata from '@/data/siteMetadata'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import OverviewItem from './OverviewItem'

type Stats = {
	numberOfPosts: number
	numberOfWords: number
}

type Views = {
	total: number
}

type Subscribers = {
	total: number
}

export default function SiteStats(): JSX.Element {
	const viewsData = useSWR<Views>(`${siteMetadata.siteUrl}/api/stats/views`, fetcher)
	const statsData = useSWR<Stats>(`${siteMetadata.siteUrl}/api/stats/posts`, fetcher)
	const subscribersData = useSWR<Subscribers>(
		`${siteMetadata.siteUrl}/api/stats/subscribers`,
		fetcher
	)

	const [views, setViews] = useState<Views>({ total: 0 })
	const [stats, setStats] = useState<Stats>({
		numberOfPosts: 0,
		numberOfWords: 0
	})
	const [subscribers, setSubscribers] = useState<Subscribers>({ total: 0 })

	useEffect(() => {
		const views = viewsData?.data
		const stats = statsData?.data
		const subscribers = subscribersData?.data

		if (views) {
			setViews(views)
		}

		if (stats) {
			setStats(stats)
		}

		if (subscribers) {
			setSubscribers(subscribers)
		}
	}, [viewsData, statsData, subscribersData])

	return (
		<div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-2">
			<OverviewItem label="All Posts Views" value={views.toLocaleString()} />
			<OverviewItem label="Number of Posts" value={stats.numberOfPosts} />
			<OverviewItem label="Number of Words" value={stats.numberOfWords.toLocaleString()} />
			<OverviewItem label="Newsletter Subscribers Count" value={subscribers.toLocaleString()} />
		</div>
	)
}
