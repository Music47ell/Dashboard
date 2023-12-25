'use client'

import { displayNumbers } from '@/utils/formatters'

interface ProgressProps {
	data: { name: string; percent?: number; xps?: number; level?: number }
	className?: string
}

const Progress = ({ data, className }: ProgressProps) => {
	const { name, percent = 0, xps = 0, level = 0 } = data

	return (
		<div className="flex items-center justify-between gap-3">
			<div className="flex w-24 flex-col">
				{name}
				<span className="text-xs text-neutral-400">Level {level}</span>
				<span className="text-xs text-neutral-400">XP {displayNumbers.format(xps)}</span>
			</div>
			<div className="relative flex h-3 flex-1 justify-center rounded-full bg-nfh-background-secondary">
				<span
					className={`absolute left-0 top-0 h-3 rounded-full px-3 ${className}`}
					style={{ width: `${percent}%`, transition: 'width 0.8s' }}
				>
					&ensp;
				</span>
			</div>
			<div className="w-8 text-right text-neutral-100">{percent.toFixed(0)}%</div>
		</div>
	)
}

export default Progress
