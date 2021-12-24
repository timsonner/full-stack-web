/// <reference types="@sveltejs/kit" />
// global definitions:

// this is reminding me of models in swift
type Todo = {
    created_at: date,
    text: string,
    done: boolean
    uid: string
}