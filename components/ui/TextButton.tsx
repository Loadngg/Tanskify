import { Colors } from '@/constants/Colors.constants'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TouchableOpacityProps } from 'react-native-gesture-handler'

interface Props extends TouchableOpacityProps {
	text: string
	isActive?: boolean
}

export default function TextButton({
	text,
	isActive = false,
	...props
}: Props) {
	return (
		<TouchableOpacity
			{...props}
			style={[styles.wrapper, isActive && styles.wrapperActive, props.style]}
		>
			<Text style={[styles.text, isActive && styles.textActive]}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: Colors.dark[800],
		borderWidth: 1,
		borderColor: Colors.accent,
		paddingHorizontal: 24,
		paddingVertical: 6,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapperActive: {
		backgroundColor: Colors.accent,
		borderColor: Colors.light,
	},
	text: {
		color: Colors.light,
	},
	textActive: {
		color: Colors.dark[900],
	},
})
