export default function CountdownTimer({ timeLeft }: { timeLeft: number }) {
	return <h2 className='text-primary-400 font-medium'>Time: {timeLeft}</h2>
}
