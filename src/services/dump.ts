import axios from '@/plugins/axios'

export async function createDump(value: { dump: string }) {
	const res = await axios.post(`/dump`, {
		folder: value.dump,
	})

	return res
}
