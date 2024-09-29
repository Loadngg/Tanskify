import customAlert from '@/components/ui/CustomAlert'
import { AlertState } from '@/constants/AlertState.constants'
import { Colors } from '@/constants/Colors.constants'
import { deleteRecord } from '@/service/records.service'
import IRecord from '@/types/Record.type'
import { useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, Text, ToastAndroid } from 'react-native'
import ListSeparator from '../../../ui/ListSeparator'
import RecordItem from './RecordItem'

interface Props {
	records: IRecord[]
	folderId: string
	fetchRecords: () => Promise<void>
}

export default function RecordsList({
	records,
	folderId,
	fetchRecords,
}: Props) {
	const filteredData = useMemo(() => {
		return records
			.filter(rec => rec.folderId === folderId)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	}, [records, folderId])

	const reversedData = useMemo(() => filteredData.toReversed(), [filteredData])

	const findPrevDate = useCallback(
		(date: Date) => {
			if (reversedData.length === 0 || reversedData.length === 1) return null
			const targetIndex = reversedData.findIndex(
				item => new Date(item.date).getTime() === new Date(date).getTime()
			)

			if (targetIndex === -1 || targetIndex === 0) {
				return null
			}

			return records[targetIndex - 1].date
		},
		[reversedData]
	)

	const deleteFolderCallback = async (recordId: string) => {
		await deleteRecord(recordId)
		await fetchRecords()

		ToastAndroid.show('Запись была успешно удалена', ToastAndroid.SHORT)
	}

	const handleDeleteAlert = async (recordId: string) => {
		customAlert(
			AlertState.Delete,
			'Вы уверены, что хотите удалить эту запись?',
			[
				{ text: 'Отмена', style: 'cancel' },
				{ text: 'Удалить', onPress: () => deleteFolderCallback(recordId) },
			]
		)
	}

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			style={styles.list}
			ItemSeparatorComponent={ListSeparator}
			data={filteredData}
			renderItem={({ item }) => (
				<RecordItem
					description={item.description}
					value={item.date}
					prevValue={findPrevDate(item.date)}
					handleDeleteAlert={() => handleDeleteAlert(item.id)}
				/>
			)}
			keyExtractor={item => item.id}
			ListEmptyComponent={
				<Text style={styles.listEmptyComponent}>Данных нет</Text>
			}
		/>
	)
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		marginBottom: 32,
	},
	listEmptyComponent: {
		fontSize: 32,
		color: Colors.light,
		textAlign: 'center',
		fontWeight: 'bold',
	},
})
