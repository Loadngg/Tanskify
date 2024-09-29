import { StorageTables } from '@/constants/Storage.constants'
import IFolder from '@/types/Folder.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { clearRecordsWithFolderId } from './records.service'

export const getAll = async (): Promise<IFolder[] | null> => {
	try {
		const result = await AsyncStorage.getItem(StorageTables.Folders)
		return result !== null ? JSON.parse(result) : []
	} catch (error: any) {
		Alert.alert('Error fetching folders:', error.message)
		return null
	}
}

export const addFolder = async (folder: IFolder): Promise<void> => {
	try {
		const result = await getAll()
		const updated = result ? [...result, folder] : [folder]
		await AsyncStorage.setItem(StorageTables.Folders, JSON.stringify(updated))
	} catch (error: any) {
		Alert.alert('Error adding folder:', error.message)
	}
}

export const deleteFolder = async (id: string): Promise<void> => {
	try {
		const result = await getAll()
		if (!result) return

		const updated = result.filter(folder => folder.id !== id)
		await AsyncStorage.setItem(StorageTables.Folders, JSON.stringify(updated))

		await clearRecordsWithFolderId(id)
	} catch (error: any) {
		Alert.alert('Error deleting folder:', error.message)
	}
}
