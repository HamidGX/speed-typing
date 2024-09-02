import { cn } from '@/lib/utils'

interface CharacterProps {
	actualCharacter: string
	expectedCharacter: string
}

export default function Character({
	actualCharacter,
	expectedCharacter,
}: CharacterProps) {
	const isCorrect = actualCharacter === expectedCharacter
	const isWhiteSpace = expectedCharacter === ' '

	return (
		<span
			className={cn({
				'text-red-500': !isCorrect && !isWhiteSpace,
				'text-primary-400': isCorrect && !isWhiteSpace,
				'bg-red-500/50': !isCorrect && !isWhiteSpace,
			})}
		>
			{expectedCharacter}
		</span>
	)
}
