/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import React from 'react';
import {
  Dimensions,
  View
} from 'react-native';

import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { CustomButton } from 'app/components/custom-button';

import i18n from 'app/lib/i18n';

type Prop = {
  visible: boolean;
  onTriggered: () => void;
  onScan: (address: string) => void;
};

const { width } = Dimensions.get('window');
export const QRScaner: React.FC<Prop> = ({
  visible,
  onTriggered,
  onScan
}) => {
  const handleSuccess = React.useCallback((e) => {
    onScan(e.data);
    onTriggered();
  }, [onScan]);

  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        marginBottom: 1
      }}
      onBackdropPress={onTriggered}
    >
      {visible ? (
        <QRCodeScanner
          onRead={handleSuccess}
          bottomContent={
            <CustomButton
              style={{
                width: width - 200
              }}
              title={i18n.t('close')}
              onPress={onTriggered}
            />
          }
        />
      ) : (
        <View />
      )}
    </Modal>
  );
};
