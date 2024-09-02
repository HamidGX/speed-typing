import { motion } from 'framer-motion'

import FormatPercentage from '@/lib/format-percetage'
import { PhaseProps } from '@/hooks/use-engine'

interface ResultsProps {
	errors: number
	accurancyPercentage: number
	total: number
	phase: PhaseProps
}

export default function Results({
	phase,
	errors,
	accurancyPercentage,
	total,
}: ResultsProps) {
	const initial = { opacity: 0 }
	const animate = { opacity: 1 }
	const duration = { duration: 0.3 }

	if (phase !== 'finish') {
		return null
	}

	return (
		<motion.ul className='flex flex-col items-center text-primary-400 space-y-4 mt-10'>
			<motion.li
				initial={initial}
				animate={animate}
				className='text-xl font-semibold'
				transition={{ ...duration, delay: 0 }}
			>
				Results
			</motion.li>
			<motion.li
				initial={initial}
				animate={animate}
				className='text-xl font-semibold text-red-500'
				transition={{ ...duration, delay: 0.5 }}
			>
				Errors: {errors}
			</motion.li>
			<motion.li
				initial={initial}
				animate={animate}
				className='text-xl font-semibold'
				transition={{ ...duration, delay: 1 }}
			>
				Accurancy: {FormatPercentage(accurancyPercentage)}
			</motion.li>
			<motion.li
				initial={initial}
				animate={animate}
				className='text-xl font-semibold'
				transition={{ ...duration, delay: 1.4 }}
			>
				Typed: {total}
			</motion.li>
		</motion.ul>
	)
}
