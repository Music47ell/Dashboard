import type { Metadata } from 'next'

import NewsletterForm from '@/components/NewsletterForm'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

import SectionHeading from './components/SectionHeading'
import SectionSubHeading from './components/SectionSubHeading'
import Stats from './components/Stats'
import Codes from './components/codes'
import Music from './components/music'
import Shows from './components/shows'

export const metadata: Metadata = {
	title: `Dashboard - ${siteMetadata.title}`,
	description: 'Dashboard for my recent activity.'
}

export default async function Homepage() {
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
			<Stats />
			<hr className="my-6 border-gray-700" />
			<Codes />
			<hr className="my-6 border-gray-700" />
			<Music />
			<hr className="my-6 border-gray-700" />
			<Shows />
		</SectionContainer>
	)
}
