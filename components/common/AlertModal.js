import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Fonts } from '../../styles/Fonts';

export default class AlertModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalVisible, setModalVisible, message, message2, confirmMsg, onConfirm, onCancel } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={[styles.message, Fonts.body1, { marginBottom: message2 ? 8 : 32 }]}>{message}</Text>
            {message2 ? (
            <Text style={[styles.message2, Fonts.body1]}>{message2}</Text>
            ) : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  if (onCancel) onCancel();
                }}
              >
                <Text style={Fonts.body2}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setModalVisible(false);
                  if (onConfirm) onConfirm();
                }}
              >
                <Text style={Fonts.body2}>{confirmMsg}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
  },
  message2: {
    marginBottom: 28
  },
  buttonRow: {
    flexDirection: 'row',
  },
  cancelButton: {
    width: '50%',
    paddingTop: 16,
    paddingBottom: 7,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  confirmButton: {
    width: '50%',
    paddingTop: 16,
    paddingBottom: 7,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  
});
