import { AlertState } from '@/constants/AlertState.constants'
import { addFolder, getAll } from '@/service/folders.service'
import IFolder from '@/types/Folder.type'
import { useState } from 'react'
import customAlert from '../../ui/CustomAlert'
import InputField from '../../ui/InputField'
import TextButton from '../../ui/TextButton'
import ModalView from '../ModalView'

interface Props {
	modalVisible: boolean
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setFolders: React.Dispatch<React.SetStateAction<IFolder[]>>
}

export default function FoldersCreateModal({
	modalVisible,
	setModalVisible,
	setFolders,
}: Props) {
	const [newFolderName, setNewFolderName] = useState<string>('')

	const hideModal = () => {
		setNewFolderName('')
		setModalVisible(false)
	}

	const handleCreate = async () => {
		if (newFolderName.trim() === '') {
			return customAlert(
				AlertState.Error,
				'Название папки не может быть пустым'
			)
		}

		const newFolder: IFolder = {
			id: Date.now().toString(),
			name: newFolderName,
		}
		await addFolder(newFolder)
		const updatedFolders = await getAll()
		if (updatedFolders === null) return
		setFolders(updatedFolders)

		hideModal()
	}

	return (
		<ModalView
			title='Новая папка'
			visible={modalVisible}
			onRequestClose={hideModal}
		>
			<InputField
				placeholder='Введите название'
				value={newFolderName}
				onChangeText={setNewFolderName}
			/>
			<TextButton
				text='Создать'
				isActive
				onPress={handleCreate}
				style={{ width: '100%' }}
			/>
		</ModalView>
	)
}
