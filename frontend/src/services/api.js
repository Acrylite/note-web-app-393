import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const client = (token) =>
	axios.create({
		baseURL: BASE_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
		},
	});

// notes
export const getNotes = (token) => client(token).get("/notes");
export const createNote = (token, note) => client(token).post("/notes", note);
export const updateNote = (token, note) => client(token).put(`/notes/${note.id}`, note);
export const deleteNote = (token, id) => client(token).delete(`/notes/${id}`);

// to-do notes
export const getTodos = (token) => client(token).get("/todos");
export const createTodo = (token, todo) => client(token).post("/todos", todo);
export const updateTodo = (token, todo) => client(token).put(`/todos/${todo.id}`, todo);
export const deleteTodo = (token, id) => client(token).delete(`/todos/${id}`);
