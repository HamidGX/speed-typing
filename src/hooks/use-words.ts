import { faker } from '@faker-js/faker'
import { useCallback, useState } from 'react'

const generatedWords = (count: number) => {
	return faker.lorem.words(count).toLocaleLowerCase()
}

export default function useWords(count: number) {
	const [words, setWords] = useState(generatedWords(count))

	const updateWords = useCallback(() => {
		setWords(generatedWords(count))
	}, [count])

	return { words, updateWords }
}
