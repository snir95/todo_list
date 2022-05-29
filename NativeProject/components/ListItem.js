import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import CustomButton from './buttons/CustomButton';
import {useUpdateTaskMutation} from '../services/task';

const ListItem = ({item, handlers}) => {
  const [editable, setEditable] = useState(false);

  // const [text, setText] = useState('');
  // const [bColor, setBColor] = useState('white');
  // const [isActivated, setIsActivated] = useState(true);
  // const [tagged, setTagged] = useState('');

  const [currTask, setCurrTask] = useState(item);
  console.log(currTask, 'blablabla');
  const [updateTask, updateResult] = useUpdateTaskMutation();
  const handleEdit = currTask => {
    console.log(currTask, 'edit shit');
    updateTask({
      _id: currTask._id,
      title: currTask.title,
      bgColor: currTask.bgColor,
      isActive: currTask.isActive,
      tag: currTask.tag || 'home',
    });
  };
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <View style={styles.listItemView}>
          <CustomButton
            title={'delete'}
            onPress={() => handlers['deleted'](item._id)}
          />
          <CustomButton
            title={'edit'}
            onPress={() => {
              setEditable(!editable);
            }}
          />
        </View>
        <Text style={styles.listItemText}>{item.title}</Text>
      </View>
      {editable && (
        <View style={styles.listItemView}>
          <TextInput
            style={styles.input}
            onChangeText={title => setCurrTask({...currTask, title})}
            defaultValue={item.title}
          />

          <TextInput
            style={styles.input}
            onChangeText={bgColor => setCurrTask({...currTask, bgColor})}
            defaultValue={item.bgColor}
          />
          <TextInput
            style={styles.input}
            onChangeText={tag => setCurrTask({...currTask, tag})}
            defaultValue={item.tag}
          />

          <Switch
            style={styles.input}
            onValueChange={isActive => setCurrTask({...currTask, isActive})}
            value={{isActive}}
          />

          <CustomButton
            title={'save'}
            onPress={() => {
              currTask && handleEdit(currTask);
              setEditable(false);
            }}
            defaultValue={item}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
  input: {
    height: 60,
    padding: 8,
    fontSize: 13,
  },
});

export default ListItem;
