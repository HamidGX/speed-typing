export default function calculateAccuracyPercentage(
	errors: number,
	total: number
) {
	if (total > 0) {
		const corrects = total - errors
		return (corrects / total) * 100
	}

	return 0
}
