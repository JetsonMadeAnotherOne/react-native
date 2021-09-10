import React, { useState } from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from "./src/screens/MainScreen";
import { ToDoScreen } from "./src/screens/ToDoScreen";

async function loadApplication() {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')

    })
}

export default function App() {
    const [todoId, setTodoId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [todos, setTodos] = useState([
        { id: '1', title: 'dsgfdgfd' },
        { id: '2', title: 'Написать приложение' },
    ]);
    if (!isReady) {
        return <AppLoading startAsync={loadApplication} onError={err => console.log(err)}
                           onFinish={() => setIsReady(true)}/>
    }

    const addTodo = (title) => {
        setTodos(prev => [...prev, {
            id: Date.now(),
            title
        }]);
    };

    const updateTodo = (id, title) => {
        setTodos(old => old.map(todo => {
            if (todo.id === id) {
                todo.title = title
            }
            return todo;
        }));
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
        const selectedTodo = todos.find(todo => todo.id === todoId);
        content =
            <ToDoScreen onRemove={removeTodo} onSave={updateTodo} todo={selectedTodo} goBack={() => setTodoId(null)}/>
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
