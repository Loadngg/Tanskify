import { Colors } from '@/constants/Colors.constants'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/Roboto-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: false,
					statusBarStyle: 'light',
					statusBarColor: Colors.dark[900],
				}}
			/>
		</Stack>
	)
}
