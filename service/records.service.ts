import { StorageTables } from '@/constants/Storage.constants'
import IRecord from '@/types/Record.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export const getAll = async (): Promise<IRecord[] | null> => {
	try {
		const result = await AsyncStorage.getItem(StorageTables.Records)
		return result !== null ? JSON.parse(result) : []
	} catch (error: any) {
		Alert.alert('Error fetching records:', error.message)
		return null
	}
}

export const addRecord = async (record: IRecord): Promise<void> => {
	try {
		const result = await getAll()
		const updated = result ? [...result, record] : [record]
		await AsyncStorage.setItem(StorageTables.Records, JSON.stringify(updated))
	} catch (error: any) {
		Alert.alert('Error adding record:', error.message)
	}
}

export const deleteRecord = async (id: string): Promise<void> => {
	try {
		const result = await getAll()
		if (!result) return

		const updated = result.filter(record => record.id !== id)
		await AsyncStorage.setItem(StorageTables.Records, JSON.stringify(updated))
	} catch (error: any) {
		Alert.alert('Error deleting record:', error.message)
	}
}

export const clearRecordsWithFolderId = async (
	folderId: string
): Promise<void> => {
	try {
		const result = await getAll()
		if (!result) return

		const updated = result.filter(folder => folder.id !== folderId)
		await AsyncStorage.setItem(StorageTables.Records, JSON.stringify(updated))
	} catch (error: any) {
		Alert.alert('Error cleaning records:', error.message)
	}
}
