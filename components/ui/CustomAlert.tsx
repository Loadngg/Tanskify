import { Alert, AlertButton } from 'react-native'

const defaultButtons: AlertButton[] = [{ text: 'OK' }]

export default function customAlert(
	title: string,
	message: string,
	buttons: AlertButton[] = defaultButtons
) {
	return Alert.alert(title, message, buttons, {
		cancelable: true,
	})
}
