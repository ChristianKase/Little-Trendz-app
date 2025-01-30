import React, { useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const IntroVideoModal = ({ visible, onEnd }) => {
  useEffect(() => {
    if (!visible) {
     
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onEnd}
    >
      <View style={styles.container}>
        <Video
          source={require('../../assets/intro.mp4')}
          style={styles.video}
          resizeMode="cover"  
          onEnd={onEnd}
          controls={true}  
          fullscreen={false}  
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default IntroVideoModal;
