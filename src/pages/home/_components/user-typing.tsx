import Caret from './caret'
import Character from './character'

interface UserTypingProps {
	userInput: string
	words: string
}

export default function UserTyping({ userInput, words }: UserTypingProps) {
	const typedCharacters = userInput.split('')

	return (
		<div className='absolute inset-0'>
			{typedCharacters.map((character, index) => (
				<Character
					key={`${character}_${index}`}
					actualCharacter={character}
					expectedCharacter={words[index]}
				/>
			))}
			<Caret />
		</div>
	)
}
