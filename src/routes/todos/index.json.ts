// route: localhostaddress/todos.json
// todos is a route because it is a folder and contains an index.json.* file


import type { RequestHandler } from "@sveltejs/kit"
// imports return types, paramaters, etc
// TODO: Persist in database
let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos,
    }
}

export const post: RequestHandler<{}, FormData> = (request) => {
    console.log(request.body.get("text"));
    todos.push({
        created_at: new Date(),
        text: request.body.get("text"),
        done: false,
        
        
    
    }); // add todo item to array
    console.log(todos)
    // without a return, a 404 error is the default
    return {
        status: 303, // redirect after submitting the form
        headers: {
            location: "/"  // location is used in conjunction with the 303 redirect
        }
    }
}

