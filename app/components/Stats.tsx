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
	const viewsData = useSWR<Views>(`${siteMetadata.siteUrl}/api/turso/views`, fetcher)
	const statsData = useSWR<Stats>(`${siteMetadata.siteUrl}/api/github/stats`, fetcher)
	const subscribersData = useSWR<Subscribers>(
		`${
			process.env.NODE_ENV === 'development' ? 'http://localhost:8787' : siteMetadata.siteUrl
		}/api/emailoctopus/subscribers`,
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
			<OverviewItem label="All Posts Views" value={views.total} />
			<OverviewItem label="Number of Posts" value={stats.numberOfPosts} />
			<OverviewItem label="Number of Words" value={stats.numberOfWords} />
			<OverviewItem label="Newsletter Subscribers Count" value={subscribers.total} />
		</div>
	)
}
