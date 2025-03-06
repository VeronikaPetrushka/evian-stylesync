import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assts/nav/1.png');
      break;
    case '2':
      imageSource = require('../assts/nav/2.png');
      break;
    case '3':
      imageSource = require('../assts/nav/3.png');
      break;
    case '4':
      imageSource = require('../assts/nav/4.png');
      break;
    case 'close':
      imageSource = require('../assts/icons/close.png');
      break;
    case 'arrows':
      imageSource = require('../assts/icons/arrows.png');
      break;
    case 'back':
      imageSource = require('../assts/icons/back.png');
      break;
    case 'share':
      imageSource = require('../assts/icons/share.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#cf0000',
  },

});

export default Icons;
