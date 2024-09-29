import { Colors } from '@/constants/Colors.constants'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

export default function InputField({ ...props }: TextInputProps) {
	return (
		<TextInput
			style={styles.field}
			{...props}
			placeholderTextColor={Colors.accent}
		/>
	)
}

const styles = StyleSheet.create({
	field: {
		width: '100%',
		borderWidth: 1,
		borderColor: Colors.accent,
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 8,
		color: Colors.light,
		backgroundColor: Colors.dark[800],
	},
})
