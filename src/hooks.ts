// hooks.ts is used as a middle man, or proxy if you will, it nests between web and API
import type { Handle } from "@sveltejs/kit"

// this function is necessary because of HTML specification only accepting get and post on forms
// it enables an HTML form to make a delete request with this workaround
export const handle: Handle = async ({ request, resolve }) => {
    if (request.query.has("_method")) {
        request.method = request.query.get("_method").toUpperCase()
    }
    const response = await resolve(request)
    return response
}