import InputField from '@/components/ui/InputField'
import TextButton from '@/components/ui/TextButton'
import { Colors } from '@/constants/Colors.constants'
import { addRecord, getAll } from '@/service/records.service'
import IRecord from '@/types/Record.type'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useMemo, useState } from 'react'
import { Text } from 'react-native'
import ModalView from '../../ModalView'

interface Props {
	modalVisible: boolean
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setRecords: React.Dispatch<React.SetStateAction<IRecord[]>>
	folderId: string
}

export default function RecordsCreateModal({
	modalVisible,
	setModalVisible,
	setRecords,
	folderId,
}: Props) {
	const [date, setDate] = useState<Date>(new Date())
	const [description, setDescription] = useState<string>('')

	const formattedDate = useMemo((): string => {
		return date.toLocaleDateString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	}, [date])

	const hideModal = () => {
		setDescription('')
		setModalVisible(false)
	}

	const handleCreate = async () => {
		const newRecord: IRecord = {
			id: Date.now().toString(),
			date: date,
			folderId: folderId,
			description: description,
		}
		await addRecord(newRecord)
		const result = await getAll()
		if (result === null) return
		setRecords(result)

		hideModal()
	}

	const showDatepicker = () => {
		DateTimePickerAndroid.open({
			value: date,
			onChange: (_, selectedDate) => {
				if (!selectedDate) return

				setDate(selectedDate)
			},
			mode: 'date',
			is24Hour: true,
		})
	}

	return (
		<ModalView
			title='Описание для записи'
			visible={modalVisible}
			onRequestClose={hideModal}
			footer={
				<TextButton
					text='Создать'
					isActive
					onPress={handleCreate}
					style={{
						width: '70%',
						position: 'absolute',
						marginHorizontal: 'auto',
						bottom: 24,
					}}
				/>
			}
		>
			<Text style={{ width: '100%', color: Colors.light }}>
				{formattedDate}
			</Text>
			<TextButton
				text='Выбрать дату'
				isActive
				onPress={showDatepicker}
				style={{ width: '100%' }}
			/>
			<InputField
				placeholder='Введите заметку'
				value={description}
				onChangeText={setDescription}
			/>
		</ModalView>
	)
}
