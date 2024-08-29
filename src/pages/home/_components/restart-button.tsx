import { useRef } from 'react'
import { MdRefresh } from 'react-icons/md'

interface RestartButtonProps {
	onClick: () => void
}

export default function RestartButton({
	onClick: handleRestart,
}: RestartButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null)

	function handleClick() {
		buttonRef.current?.blur()
		handleRestart()
	}

	return (
		<button
			ref={buttonRef}
			onClick={handleClick}
			className={`block rounded px-8 py-2 hover:bg-slate-700/50 mx-auto mt-10 text-zinc-500`}
		>
			<MdRefresh className='w-6 h-6' />
		</button>
	)
}
