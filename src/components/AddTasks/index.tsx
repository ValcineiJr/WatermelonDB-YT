import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ICategory } from '../../@types/model';
import { database } from '../../services/watermelon';

export function AddTasks() {
  const [taskName, setTaskName] = useState('');

  async function handleAddTask() {
    await database.write(async () => {
      await database.get('categories').create((category: ICategory) => {
        category.name = taskName;
        category.sobrenome = 'Valcinei';
      });
    });

    setTaskName('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Tarefa"
        value={taskName}
        onChangeText={setTaskName}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddTask}
        activeOpacity={0.6}
      >
        <Text>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#222',
    margin: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: 8,
    color: '#222',
  },
  button: {
    backgroundColor: '#f89',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
