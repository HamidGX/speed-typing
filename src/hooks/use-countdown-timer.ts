import { useCallback, useEffect, useRef, useState } from 'react'

export default function useCountdownTimer(seconds: number) {
	const [timeLeft, setTimeLeft] = useState(seconds)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const hasTimerEnded = timeLeft <= 0
	const isRunning = intervalRef.current != null

	const startCountdown = useCallback(() => {
		if (!hasTimerEnded && !isRunning) {
			intervalRef.current = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
			}, 1000)
		}
	}, [hasTimerEnded, isRunning])

	const resetCountdown = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}
		intervalRef.current = null
		setTimeLeft(seconds)
	}, [seconds])

	useEffect(() => {
		if (hasTimerEnded && intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [hasTimerEnded])

	useEffect(() => {
		return () => {
			if (intervalRef.current!) {
				clearInterval(intervalRef.current)
			}
		}
	}, [])

	return { timeLeft, startCountdown, resetCountdown }
}
