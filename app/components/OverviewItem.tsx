interface OverviewItemProps {
	label: string
	value: number
}

const OverviewItem = ({ label, value }: OverviewItemProps) => (
	<div className="bg-nfh-background-secondary flex flex-col space-y-1 rounded-xl border border-neutral-800 px-4 py-3 sm:col-span-1">
		<span className="text-nfh-text-primary text-sm">{label}</span>
		<span>{value}</span>
	</div>
)

export default OverviewItem
