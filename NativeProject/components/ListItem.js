import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
// import {Icon} from 'react-native-vector-icons/dist/FontAwesome';
import CustomButton from './buttons/CustomButton';
import {useUpdateTaskMutation} from '../services/task';

const ListItem = ({item, handlers}) => {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState('');
  const [updateTask, updateResult] = useUpdateTaskMutation();
  const handleEdit = () => {
    updateTask({
      _id: item._id,
      title: text,
      bgColor: 'white',
      isActive: true,
      tag: 'home',
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
            onChangeText={text => setText(text)}
            defaultValue={item.title}></TextInput>
          <CustomButton
            title={'save'}
            onPress={() => {
              handleEdit(item), setEditable(false);
            }}
            defaultValue={text}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
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
