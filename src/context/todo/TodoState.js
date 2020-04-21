import React, { useReducer } from "react";
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import { v4 as uuidv4 } from 'uuid';
import {
	GET_TODOS,
	ADD_TODO,
	DELETE_TODO,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_TODO,
	FILTER_TODOS,
	CLEAR_FILTER,
	TODO_ERROR
} from "../types";

const TodoState = props => {
	const initialState = {
		todos: null,
		current: null,
		error: null
	}

	const [state, dispatch] = useReducer(todoReducer, initialState);

	// 할 일 목록 얻기
	const getTodos = async () => {
		try {
		  const res = await axios.get('/api/todos');

		  dispatch({
				type: GET_TODOS,
				payload: res.data,
			});
		} catch (err) {
		  dispatch({
				type: TODO_ERROR,
				payload: err.response.message,
			})
		}
	}

	// 할 일 추가
	const addTodo = todo => {
		todo.id = uuidv4();
		dispatch({
			type: ADD_TODO,
			payload: todo,
		})
	}

	// 할 일 삭제
	const deleteTodo = id => {
		dispatch({
			type: DELETE_TODO,
			payload: id
		})
	}

	// 할 일 선택
	const setCurrent = todo => {
		dispatch({
			type: SET_CURRENT,
			payload: todo,
		})
	}

	// 선택 된 할 일 삭제
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT
		})
	}

	// 할 일 수정
	const updateTodo = todo => {
		dispatch({
			type: UPDATE_TODO,
			payload: todo
		})
	}

	// 할 일 재정렬 (필터 적용)

	// 필터 해제

	return (
		<TodoContext.Provider
		  value={{
		  	todos: state.todos,
				current: state.current,
				getTodos,
				addTodo,
				deleteTodo,
				setCurrent,
				clearCurrent,
				updateTodo
			}}
		>
			{ props.children }
		</TodoContext.Provider>
	)
};

export default TodoState;
