import React, { useState } from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { Navbar } from './src/components/Navbar'
import { MainScreen } from "./src/screens/MainScreen";
import { ToDoScreen } from "./src/screens/ToDoScreen";

export default function App() {
    const [todoId, setTodoId] = useState('2');
    const [todos, setTodos] = useState([
        {id:'1', title: 'Выучить React Native'},
        {id:'2', title: 'Написать приложение'},
    ]);


    const addTodo = (title) => {
        setTodos(prev => [...prev, {
            id: Date.now(),
            title
        }]);
    };

    const removeTodo = id => {
        const todo = todos.find(t => t.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id))
                    }
                }
            ],
            { cancelable: false }
        )
    };
    let content = (<MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId}/>);
    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id ===todoId);
        content = <ToDoScreen onRemove={removeTodo} todo={selectedTodo} goBack={() => setTodoId(null)}/>
    }
    return (
        <View>
            <Navbar title={'Todo app!'}/>
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
});
