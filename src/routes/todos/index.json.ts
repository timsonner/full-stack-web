// route: localhostaddress/todos.json
// todos is a route because it is a folder and contains an index.json.* file


import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"
// imports return types, paramaters, etc

export const get: RequestHandler = (request) => {
    return api(request)
}

export const post: RequestHandler<{}, FormData> = (request) => {
    console.log(request.body.get("text"))
    return api(request, {
        created_at: new Date(),
        text: request.body.get("text"),
        done: false,
        uid: `${Date.now()}` // TODO: do not use this kind of code in production
    }) // add todo item to array)
    // without a return, a 404 error is the default
}

