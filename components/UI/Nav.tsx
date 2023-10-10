import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function Nav() {
	return (
		<nav className="w-full border-y border-nfh-accent-primary px-6 py-4 shadow-inner bg-nfh-background-secondary">
			<ul className="flex justify-center space-x-4">
				{siteMetadata.NavLinks.map((navLink) => (
					<li key={navLink.title}>
						<Link href={navLink.href}>{navLink.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
