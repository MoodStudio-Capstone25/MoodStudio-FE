import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Modal from 'react-native-modal'
import { Fonts } from '../../styles/Fonts'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

/**
 * @param {boolean} isVisible  — 시트 열기/닫기
 * @param {() => void} onClose — 바깥 탭하거나 swipe down 시 닫기 콜백
 * @param {(item:any) => void} onSelect — 아이템 탭했을 때 선택 콜백
 * @param {Array<{ template: string, label: string, description: string }>} data — 리스트 데이터
 */

const BottomSheet = ({ isVisible, onClose, onSelect, data, selectedKey }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.sheet}>
        <View style={styles.handle} />

        <FlatList
          data={data}
          keyExtractor={item => item.template}
          renderItem={({ item }) => {
            const isSelected = item.template === selectedKey;
            return (
              <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                activeOpacity={0.7}
                onPress={() => onSelect(item)}
              >
                <Text style={Fonts.subtitle1}>{item.label}</Text>
                <Text style={[styles.desc, Fonts.body2]}>{item.description}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: SCREEN_HEIGHT * 0.6,  // 화면 높이의 절반 이하로 제한
  },
  handle: {
    width: 35,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  item: {
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 15,
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  selectedItem: {
    backgroundColor: '#E7C9FF'
  },

  desc: {
    marginTop: 6,
  },
})

export default BottomSheet
