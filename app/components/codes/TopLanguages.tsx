import siteMetadata from '@/data/siteMetadata'

import Progress from './Progress'

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const TopLanguages = asyncComponent(async () => {
	const data = await fetch(`${siteMetadata.siteUrl}/api/top/languages`, {
		next: {
			revalidate: 3600
		}
	}).then((res) => res.json())

	return (
		<div className="from-nfh-accent-secondary to-nfh-accent-primary relative flex flex-1 flex-col gap-2 rounded-lg bg-gradient-to-r p-[2px]">
			<div className="bg-nfh-background-primary h-full w-full rounded-lg p-2">
				<p className="bg-nfh-background-primary absolute -top-3 left-3 px-2">
					Top Programming Languages I use
				</p>
				<div className="grid gap-2 px-4 py-3">
					{data.map((language) => (
						<Progress
							key={language.name}
							data={language}
							className="from-nfh-accent-secondary to-nfh-accent-primary bg-gradient-to-r"
						/>
					))}
				</div>
			</div>
		</div>
	)
})

export default TopLanguages
