import { faker } from '@faker-js/faker'

import CountdownTimer from './_components/countdown-timer'
import GeneratedWords from './_components/generated-words'
import RestartButton from './_components/restart-button'

const words = faker.lorem.words(10)

export default function HomePage() {
	return (
		<>
			<CountdownTimer timeLeft={10} />
			<GeneratedWords words={words} />
			<RestartButton onClick={() => console.log('Restarting...')} />
		</>
	)
}
