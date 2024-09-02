export default function countErrors(
	actualCharacter: string,
	expectedCharacter: string
) {
	const expectedCharacters = expectedCharacter.split('')
	return expectedCharacters.reduce((errors, expectedChar, index) => {
		const actualChar = actualCharacter[index]
		if (actualChar !== expectedChar) {
			errors++
		}
		return errors
	}, 0)
}
