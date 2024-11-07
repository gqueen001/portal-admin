import dayjs from 'dayjs'

export function convertToSeconds(time: any) {
	if (!time) return 0
	const hours = time.hour()
	const minutes = time.minute()
	const seconds = time.second()
	return hours * 3600 + minutes * 60 + seconds
}

export function convertToHour(seconds: any) {
	return dayjs().startOf('day').second(seconds).format('HH:mm:ss')
}
