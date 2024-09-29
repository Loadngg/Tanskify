import { Colors } from '@/constants/Colors.constants'
import { Modal, ModalProps, StyleSheet, Text, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

interface Props extends ModalProps {
	title: string
	children: React.ReactNode
	footer?: React.ReactNode
}

export default function ModalView({
	title,
	children,
	footer,
	...props
}: Props) {
	return (
		<Modal animationType='fade' transparent={true} {...props}>
			<View style={styles.modalContainer}>
				<Shadow
					distance={7}
					startColor={Colors.modalShadow}
					style={{ width: '100%' }}
				>
					<View style={styles.modalView}>
						<Text style={styles.modalTitle}>{title}</Text>
						{children}
					</View>
				</Shadow>
				{footer}
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.modalShadow,
	},
	modalView: {
		width: 300,
		backgroundColor: Colors.dark[900],
		borderRadius: 12,
		paddingHorizontal: 24,
		paddingVertical: 32,
		gap: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalTitle: {
		color: Colors.light,
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 16,
	},
})
