import TextButton from '@/components/ui/TextButton'
import { Colors } from '@/constants/Colors.constants'
import { getAll } from '@/service/records.service'
import IRecord from '@/types/Record.type'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RecordsCreateModal from './widgets/RecordCreateModal'
import RecordsList from './widgets/RecordsList'

export default function RecordsView({ folderId }: { folderId: string }) {
	const [records, setRecords] = useState<IRecord[]>([])
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const fetchRecords = async () => {
		const result = await getAll()

		if (result === null) return
		setRecords(result)
	}

	useEffect(() => {
		fetchRecords()
	}, [])

	return (
		<>
			<View style={styles.wrapper}>
				{folderId ? (
					<>
						<RecordsList
							records={records}
							folderId={folderId}
							fetchRecords={fetchRecords}
						/>
						<TextButton
							text='Добавить'
							isActive
							style={styles.addButton}
							onPress={() => setModalVisible(true)}
						/>
					</>
				) : (
					<Text style={styles.missingFolder}>
						Сначала добавьте или выберите папку
					</Text>
				)}
			</View>
			<RecordsCreateModal
				modalVisible={modalVisible}
				setRecords={setRecords}
				setModalVisible={setModalVisible}
				folderId={folderId}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		flex: 1,
	},
	addButton: {
		width: '70%',
		marginHorizontal: 'auto',
	},
	missingFolder: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.light,
		textAlign: 'center',
		marginVertical: 'auto',
	},
})
