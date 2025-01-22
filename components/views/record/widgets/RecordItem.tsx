import { Colors } from '@/constants/Colors.constants'
import { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

interface Props {
	description: string
	value: Date
	nextValue: Date | null
	handleDeleteAlert: () => Promise<void>
}

export default function RecordItem({
	description,
	value,
	nextValue,
	handleDeleteAlert,
}: Props) {
	const date = new Date(value)
	const nextDate = nextValue ? new Date(nextValue) : new Date()

	const formattedDate = useMemo((): string => {
		return date.toLocaleDateString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}, [date])

	const daysBetweenDates = useMemo((): number => {
		const nextTime = nextDate.getTime()
		const time = date.getTime()

		const timeDifferenceMs = Math.abs(nextTime - time)

		return Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24))
	}, [value, nextValue])

	return (
		<Shadow
			style={{ width: '100%' }}
			distance={4}
			offset={[0, 4]}
			startColor={Colors.shadow}
			containerStyle={{ marginBottom: 7 }}
		>
			<TouchableOpacity style={styles.card} onLongPress={handleDeleteAlert}>
				{description && <Text style={styles.description}>{description}</Text>}
				<Text style={styles.date}>{formattedDate}</Text>
				<Text style={styles.countPastDays}>
					Дней пройдено: {daysBetweenDates}
				</Text>
			</TouchableOpacity>
		</Shadow>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		paddingHorizontal: 32,
		paddingVertical: 18,
		backgroundColor: Colors.dark[800],
		borderRadius: 18,
		shadowColor: Colors.light,
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 4,
	},
	description: {
		fontSize: 16,
		color: Colors.accent,
	},
	date: {
		fontSize: 20,
		color: Colors.light,
		fontWeight: 'bold',
	},
	countPastDays: {
		fontSize: 12,
		color: Colors.accent,
	},
})
