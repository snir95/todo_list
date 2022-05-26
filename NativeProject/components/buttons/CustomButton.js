import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import Images from '../../appearance/Images';
const CustomButton = ({title, onPress, buttonColor, buttonStyle}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...(buttonStyle || {
          width: 25,
          aspectRatio: 1 / 1,
          borderWidth: 1,
          borderRadius: 2,
        }),
        backgroundColor: buttonColor || '#f8f8f8',
      }}
      onPress={onPress}>
      <Image source={Images[title]} />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#512DA8',
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
