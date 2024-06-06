import React, {FC, ReactNode} from 'react';
import {Modal, View} from 'react-native';
import styles from './customModal.styles.ts';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

const CustomModal: FC<ModalProps> = ({isOpen, setIsOpen, children}) => {
  const handleOnCloseModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        statusBarTranslucent={true}
        onRequestClose={handleOnCloseModal}>
        <View style={styles.outerView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
