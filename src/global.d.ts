/// <reference types="@sveltejs/kit" />

// this is reminding me of models in swift
type Todo = {
    created_at: date,
    text: string,
    done: boolean
}