import type { Metadata } from 'next'

import NewsletterForm from '@/components/NewsletterForm'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { getSubscribersCount } from '@/lib/emailoctopus'
import { getContentStats } from '@/lib/stats'
import { getBlogViews } from '@/lib/views'

import Codes from './components/codes'
import Music from './components/music'
import OverviewItem from './components/OverviewItem'
import SectionHeading from './components/SectionHeading'
import SectionSubHeading from './components/SectionSubHeading'
import Shows from './components/shows'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard for my recent activity.',
}

export default async function Homepage() {
	const [views, subscribers] = await Promise.all([getBlogViews(), getSubscribersCount()])
	const siteStats = await getContentStats()

	return (
		<SectionContainer>
			<div className="flex flex-col gap-y-2">
				<PageTitle>Dashboard</PageTitle>
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>This dashboard contains data pulled from various sources.</span>
					</div>
				</SectionSubHeading>
				<NewsletterForm />
			</div>
			<hr className="my-6 border-gray-700" />
			<section className="flex flex-col gap-y-5">
				<SectionHeading title="Site Stats" />
				<SectionSubHeading>
					<div className="text-neutral-400 md:flex-row md:items-center">
						<span>My site's stats</span>
					</div>
				</SectionSubHeading>
			</section>
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-2">
				<OverviewItem label="All Posts Views" value={views.toLocaleString()} />
				<OverviewItem label="Number of Posts" value={siteStats.numberOfPosts} />
				<OverviewItem label="Number of Words" value={siteStats.numberOfWords.toLocaleString()} />
				<OverviewItem label="Newsletter Subscribers Count" value={subscribers.toLocaleString()} />
			</div>
			<hr className="my-6 border-gray-700" />
			<Codes />
			<hr className="my-6 border-gray-700" />
			<Music />
			<hr className="my-6 border-gray-700" />
			<Shows />
		</SectionContainer>
	)
}
