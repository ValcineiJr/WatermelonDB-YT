import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICategory } from '../../@types/model';

import withObservables from '@nozbe/with-observables';
import { database } from '../../services/watermelon';

interface Props {
  categories: ICategory;
}

function RawListItem({ categories }: Props) {
  async function handleDeleteTask() {
    await database.write(async () => {
      const category = await database.get('categories').find(categories.id);
      await category.destroyPermanently();
    });
  }

  async function handleUpdateTask() {
    await database.write(async () => {
      const category = (await database
        .get('categories')
        .find(categories.id)) as any;
      await category.update(() => {
        category.name = 'Video ainda não Terminado';
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categories.sobrenome}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleDeleteTask}
        >
          <Text style={styles.button_text}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginLeft: 5, backgroundColor: '#28A745' }]}
          activeOpacity={0.6}
          onPress={handleUpdateTask}
        >
          <Text style={styles.button_text}>Modificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#06d',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    margin: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 16 },
  button: { backgroundColor: '#DC3545', padding: 15, borderRadius: 10 },
  button_text: { color: '#fff' },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const ListItem = withObservables(['categories'], ({ categories }) => ({
  categories,
}))(RawListItem);
