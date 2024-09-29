export default interface IRecord {
	id: string
	date: Date
	description: string

	folderId: string // FK
}
