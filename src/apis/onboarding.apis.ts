import callAPI from "../utils/callAPI"
import { BASE_URL } from "../utils/constants copy"

export const getImageUrl = (body: FormData) => {
    return callAPI<any>(BASE_URL, '/api/v1/upload', 'post', body)
}