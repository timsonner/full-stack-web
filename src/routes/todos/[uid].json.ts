// [] brackets in filename tell Svelte contents of brackets are dynamic
import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"

export const del: RequestHandler = (request) => {
    return api(request)
}