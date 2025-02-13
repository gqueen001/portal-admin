import axios from '@/plugins/axios'

export async function sseConnection() {
	const { data } = await axios('/v1/media/transfer/progress')
	return data
}
