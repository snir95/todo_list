import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useCreateTaskMutation} from '../services/task';
const AddItem = () => {
  const [createTask, createResult] = useCreateTaskMutation();
  const [text, setText] = useState('');
  const handleSubmit = () => {
    createTask({
      title: text,
      bgColor: 'green',
      isActive: true,
      tag: 'home',
    });
    setText('');
  };

  return (
    <View>
      <TextInput
        placeholder="Add a Todo here..."
        style={styles.input}
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <TouchableOpacity onPress={() => handleSubmit(text)} style={styles.btn}>
        <Image source={require('../assets/add.png')} />
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;
