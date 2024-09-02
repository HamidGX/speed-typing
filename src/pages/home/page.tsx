import CountdownTimer from './_components/countdown-timer'
import GeneratedWords from './_components/generated-words'
import RestartButton from './_components/restart-button'
import Results from './_components/results'
import UserTyping from './_components/user-typing'

import useEngine from '@/hooks/use-engine'
import calculateAccuracyPercentage from '@/lib/calculate-accurancy-percentage'

export default function HomePage() {
	const { phase, words, timeLeft, typed, errors, restart, totalTyped } =
		useEngine()

	return (
		<div className='px-4'>
			<CountdownTimer timeLeft={timeLeft} />
			<div className='relative max-w-xl mt-3 text-4xl leading-relaxed break-all'>
				<GeneratedWords key={words} words={words} />
				<UserTyping words={words} userInput={typed} />
			</div>
			<RestartButton onClick={restart} />
			<Results
				phase={phase}
				errors={errors}
				accurancyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
				total={totalTyped}
			/>
		</div>
	)
}
