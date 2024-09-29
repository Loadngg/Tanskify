import FoldersView from '@/components/views/folder/FoldersView'
import RecordsView from '@/components/views/record/RecordsView'
import { Colors } from '@/constants/Colors.constants'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
	const [activeFolderId, setActiveFolderId] = useState<string>('')

	return (
		<SafeAreaView style={styles.container}>
			<FoldersView
				activeFolderId={activeFolderId}
				setActiveFolderId={setActiveFolderId}
			/>
			<RecordsView folderId={activeFolderId} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 24,
		backgroundColor: Colors.dark[900],
	},
})
