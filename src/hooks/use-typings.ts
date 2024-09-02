import { useCallback, useEffect, useRef, useState } from 'react'

const isKeyboardCodeAllowed = (code: string) => {
	return (
		code.startsWith('Key') ||
		code.startsWith('Digit') ||
		code === 'Backspace' ||
		code === 'Space'
	)
}

export default function useTypings(enabled: boolean, p0: string) {
	const [cursor, setCursor] = useState(0)
	const [typed, setTyped] = useState<string>('')
	const totalTyped = useRef(0)

	const handleBackspace = () => {
		setTyped((prev) => prev.slice(0, -1))
		setCursor((cursor) => cursor - 1)
		totalTyped.current -= 1
	}

	const handleKey = (key: string) => {
		setTyped((prev) => prev.concat(key))
		setCursor((cursor) => cursor + 1)
		totalTyped.current += 1
	}

	const keydownHandler = useCallback(
		({ key, code }: KeyboardEvent) => {
			if (!enabled || !isKeyboardCodeAllowed(code)) {
				return
			}

			if (key === 'Backspace') {
				handleBackspace()
			} else {
				handleKey(key)
			}
		},
		[enabled]
	)

	const clearTyped = useCallback(() => {
		setTyped('')
		setCursor(0)
	}, [])

	const resetTotalTyped = useCallback(() => {
		totalTyped.current = 0
	}, [])

	useEffect(() => {
		window.addEventListener('keydown', keydownHandler)

		return () => {
			window.removeEventListener('keydown', keydownHandler)
		}
	}, [keydownHandler])

	return {
		cursor,
		typed,
		clearTyped,
		resetTotalTyped,
		totalTyped: totalTyped.current,
	}
}
