import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import MainHeader from './MainHeader';
import {useGetTasksQuery, useDeleteTaskMutation} from '../services/task';
import ListItem from './ListItem';
import AddItem from './AddItem';

const MainScreen = () => {
  const {data} = useGetTasksQuery();
  const [deleteTask, deleteResult] = useDeleteTaskMutation();

  const handleDelete = id => {
    deleteTask(id);
  };

  // console.log(`item is  ${data} - ${JSON.stringify(data)}`);

  const handlers = {
    // submit: handleSubmit,
    deleted: handleDelete,
    // edit: handleEdit,
  };

  return (
    <View style={styles.container}>
      <MainHeader />
      <AddItem />
      <FlatList
        data={data}
        renderItem={({item}) => <ListItem handlers={handlers} item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});
export default MainScreen;
