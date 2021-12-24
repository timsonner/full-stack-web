// _ in filename tells Svelte to ignore this file and not create a route for it

import type { Request } from "@sveltejs/kit"

// TODO: Persist in database
let todos: Todo[] = []

export const api = (request: Request, data?: Record<string, unknown>) => {
    let body = {}
    let status = 500 // throws 500 server status error if method is not implemented here

    switch (request.method.toUpperCase()) {
        case "GET":
            body = todos
            status = 200
            break
        case "POST":
            todos.push(data as Todo) // treat data argument as a todo
            body = data
            status = 201 // status code for "created"
            break
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== request.params.uid)
            status = 200
            break
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === request.params.uid) {
                    todo.text = data.text as string
                }
            return todo
            })
            status = 200
            break
        default:
            break
    }
    if (request.method.toUpperCase() !== "GET") {
        return {
            status: 303, // redirect after submitting the form
            headers: {
                location: "/"  // location is used in conjunction with the 303 redirect
            }
        }
    }
    return {
        status,
        body,
    }
}
