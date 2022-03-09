import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { database } from '../../services/watermelon';
import withObservables from '@nozbe/with-observables';

import { ListItem } from '../../components/ListItem';
import { AddTasks } from '../../components/AddTasks';
import { ICategories } from '../../@types/model';

const db = database.collections.get('categories');
const observeCategories = () => db.query().observe();

const enhanceWithCategories = withObservables([], () => ({
  categories: observeCategories(),
}));

const CategoryList = ({ categories }: ICategories) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#222" barStyle="light-content" />
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ListItem categories={item} />}
      ListHeaderComponent={() => <AddTasks />}
    />
  </View>
);

const CategoryListRender = enhanceWithCategories(CategoryList);

export function Home() {
  return <CategoryListRender />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', paddingTop: 20 },
});
