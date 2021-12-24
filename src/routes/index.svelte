<script context="module" lang="ts">
    // server side rendering, this is loaded once
    // fetch data from server before components are rendered
    import type { Load } from "@sveltejs/kit";
    // fetch data from endpoint
    export const load: Load = async ({ fetch }) => {
        // this is a GET request
        const res = await fetch("/todos.json");
        // if response is ok, convert response and fetch todo items
        if (res.ok) {
            // res.json() body contains an array of todos, so todos = todos
            const todos = await res.json();
            return {
                props: { todos },
            };
        }
        const { message } = await res.json();
        return {
            error: new Error(message),
        };
    };
</script>

<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";
    const title = "Todos";
    export let todos: Todo[];
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form action="/todos.json" method="post" class="newTodo">
        <input
            type="text"
            name="text"
            aria-label="Add a todo"
            placeholder="+ Tap to add a todo"
        />
    </form>
    {#each todos as todo}
        <TodoItem {todo} />
    {/each}
</div>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }
    .newTodo {
        margin: 0 0 0.5rem 0;
        align-self: center;
    }
    .newTodo input {
        font-size: large;
        width: 100%;
        padding: 0.5em 1em 0.3 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        text-align: center;
    }
    .todos :global(input) {
        border: 1px solid transparent;
    }
    .todos :global(input:focus-visible) {
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #ff3e00 !important;
        outline: none;
    }
</style>
