import { AlertState } from '@/constants/AlertState.constants'
import { deleteFolder, getAll } from '@/service/folders.service'
import IFolder from '@/types/Folder.type'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, ToastAndroid } from 'react-native'
import customAlert from '../../ui/CustomAlert'
import ListSeparator from '../../ui/ListSeparator'
import TextButton from '../../ui/TextButton'
import FoldersCreateModal from './FoldersCreateModal'

export default function FoldersView({
	activeFolderId,
	setActiveFolderId,
}: {
	activeFolderId: string
	setActiveFolderId: React.Dispatch<React.SetStateAction<string>>
}) {
	const [folders, setFolders] = useState<IFolder[]>([])
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const fetchFolders = async () => {
		const result = await getAll()

		if (result === null) return
		setFolders(result)
	}

	useEffect(() => {
		fetchFolders()
	}, [])

	const setActiveFolderCallback = useCallback(() => {
		if (folders.length === 0) return setActiveFolderId('')
		setActiveFolderId(folders[0].id)
	}, [folders])

	useEffect(() => {
		setActiveFolderCallback()
	}, [setActiveFolderCallback])

	const deleteFolderCallback = async (folderId: string) => {
		await deleteFolder(folderId)
		await fetchFolders()

		setActiveFolderCallback()

		ToastAndroid.show('Папка была успешно удалена', ToastAndroid.SHORT)
	}

	const handleDeleteAlert = async (folderId: string) => {
		customAlert(
			AlertState.Delete,
			'Вы уверены, что хотите удалить эту папку? Все записи в этой папке также будут удалены',
			[
				{ text: 'Отмена', style: 'cancel' },
				{
					text: 'Удалить',
					style: 'destructive',
					onPress: () => deleteFolderCallback(folderId),
				},
			]
		)
	}

	return (
		<>
			<FlatList
				style={styles.list}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={ListSeparator}
				data={folders}
				renderItem={({ item }) => (
					<TextButton
						text={item.name}
						onLongPress={() => handleDeleteAlert(item.id)}
						onPress={() => setActiveFolderId(item.id)}
						isActive={item.id === activeFolderId}
					/>
				)}
				keyExtractor={item => item.id}
				ListFooterComponentStyle={styles.listFooter}
				ListFooterComponent={
					<TextButton text={'+'} onPress={() => setModalVisible(true)} />
				}
			/>

			<FoldersCreateModal
				modalVisible={modalVisible}
				setFolders={setFolders}
				setModalVisible={setModalVisible}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		flexGrow: 0,
		flexShrink: 0,
		marginBottom: 32,
	},
	listFooter: {
		marginLeft: 12,
	},
})
