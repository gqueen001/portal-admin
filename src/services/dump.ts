import axios from '@/plugins/axios'

export async function createDump(value: { dump: string }) {
	return await axios.post(`/dump`, {
		folder: value.dump
	})
}