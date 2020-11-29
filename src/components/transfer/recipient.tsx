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
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  ReceiveIconSVG,
  ProfileSVG,
  BookIconSVG
} from 'app/components/svg';
import {
  AccountsModal,
  ContactsModal
} from 'app/components/modals';
import { QrCodeInput } from 'app/components/qr-code-input';

import i18n from 'app/lib/i18n';
import coomonStyles from './styles';
import { theme } from 'app/styles';
import { Account, Contact } from 'types';

type Prop = {
  style?: ViewStyle;
  accounts: Account[];
  contacts: Contact[];
  recipient: string;
  onSelect: (address: string) => void;
};

export const TransferRecipient: React.FC<Prop> = ({
  style,
  recipient,
  accounts,
  contacts,
  onSelect
}) => {
  const [accountModal, setAccountModal] = React.useState(false);
  const [contactModal, setContactModal] = React.useState(false);

  return (
    <React.Fragment>
      <View style={style}>
        <View style={coomonStyles.receiving}>
          <SvgXml xml={ReceiveIconSVG} />
          <QrCodeInput
            placeholder={i18n.t('transfer_view0')}
            value={recipient}
            onChange={onSelect}
          />
        </View>
        <View style={styles.itemsWrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setAccountModal(true)}
          >
            <SvgXml xml={ProfileSVG} />
            <Text style={styles.textItem}>
              {i18n.t('my_accounts')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setContactModal(true)}
          >
            <SvgXml xml={BookIconSVG} />
            <Text style={styles.textItem}>
              {i18n.t('my_contacts')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AccountsModal
        title={i18n.t('transfer_modal_title1')}
        visible={accountModal}
        onTriggered={() => setAccountModal(false)}
        accounts={accounts}
        onSelected={(index) => onSelect(accounts[index].bech32)}
      />
      <ContactsModal
        title={i18n.t('transfer_modal_title2')}
        visible={contactModal}
        contacts={contacts}
        onTriggered={() => setContactModal(false)}
        onSelected={(index) => onSelect(contacts[index].address)}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  itemsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10
  },
  item: {
    padding: 10,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: '#2B2E33'
  },
  textItem: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 13,
    color: theme.colors.white
  }
});