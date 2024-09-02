import { useCallback, useState, useEffect } from 'react'

import countErrors from '@/lib/count-errors'

import useWords from './use-words'
import useCountdownTimer from './use-countdown-timer'
import useTyping from './use-typings'

export type PhaseProps = 'start' | 'run' | 'finish'

const numberWords = 12
const countDownSeconds = 30

export default function useEngine() {
	const [phase, setPhase] = useState<PhaseProps>('start')
	const { timeLeft, startCountdown, resetCountdown } =
		useCountdownTimer(countDownSeconds)
	const { words, updateWords } = useWords(numberWords)
	const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTyping(
		phase !== 'finish',
		phase
	)

	const [errors, setErrors] = useState(0)

	const isStartPhase = phase === 'start' && cursor > 0
	const areWordsCompleted = cursor === words.length

	const sumErrors = useCallback(() => {
		const wordsReached = words.substring(0, Math.min(cursor, words.length))
		setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached))
	}, [typed, words, cursor])

	useEffect(() => {
		if (isStartPhase) {
			setPhase('run')
			startCountdown()
		}
	}, [isStartPhase, startCountdown, cursor])

	useEffect(() => {
		if (!timeLeft && phase === 'run') {
			setPhase('finish')
			sumErrors()
		}
	}, [timeLeft, sumErrors, phase])

	useEffect(() => {
		if (areWordsCompleted) {
			sumErrors()
			updateWords()
			clearTyped()
		}
	}, [clearTyped, areWordsCompleted, updateWords, sumErrors])

	const restart = useCallback(() => {
		resetCountdown()
		resetTotalTyped()
		setPhase('start')
		setErrors(0)
		updateWords()
		clearTyped()
	}, [resetCountdown, resetTotalTyped, updateWords, clearTyped])

	return { phase, words, timeLeft, typed, errors, restart, totalTyped }
}
