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
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SvgXml, SvgCssUri } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStore } from 'effector-react';

import {
  ProfileSVG,
  WalletIconSVG,
  ReceiveIconSVG,
  ArrowIconSVG
} from 'app/components/svg';
import { CustomButton } from 'app/components/custom-button';
import { TokensModal, AccountsModal } from 'app/components/modals';

import { theme } from 'app/styles';
import i18n from 'app/lib/i18n';
import { TOKEN_ICONS } from 'app/config';
import { keystore } from 'app/keystore';
import { RootParamList } from 'app/navigator';
import { fromZil, toConversion, trim } from 'app/filters';

type Prop = {
  navigation: StackNavigationProp<RootParamList>;
};

const { width } = Dimensions.get('window');
export const TransferPage: React.FC<Prop> = ({ navigation }) => {
  const accountState = useStore(keystore.account.store);
  const tokensState = useStore(keystore.token.store);
  const settingsState = useStore(keystore.settings.store);
  const networkState = useStore(keystore.network.store);
  const currencyState = useStore(keystore.currency.store);

  const [selectedToken, setSelectedToken] = React.useState(0);
  const [tokenModal, setTokenModal] = React.useState(false);

  const [selectedAccount, setSelectedAccount] = React.useState(accountState.selectedAddress);
  const [isAccountModal, setIsAccountModal] = React.useState(false);

  const account = React.useMemo(
    () => accountState.identities[selectedAccount],
    [accountState, selectedAccount]
  );
  const token = React.useMemo(
    () => tokensState.identities[selectedToken],
    [tokensState, selectedToken]
  );

  const converted = React.useMemo(() => {
    const { balance, decimals } = token;
    const { selected } = networkState;
    const { rate } = settingsState;
    const convert = toConversion(balance[selected], rate, decimals);

    return `${convert} ${currencyState}`;
  }, [token, networkState, settingsState, currencyState]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsAccountModal(true)}
          >
            <SvgXml xml={ProfileSVG} />
            <View style={styles.itemInfo}>
              <Text style={styles.label}>
                {i18n.t('transfer_account')}
              </Text>
              <View style={styles.infoWrapper}>
                <Text style={styles.nameAmountText}>
                  {account.name}
                </Text>
              </View>
              <View style={[styles.infoWrapper, { marginBottom: 15 }]}>
                <Text style={styles.addressAmount}>
                  {trim(account[settingsState.addressFormat])}
                </Text>
              </View>
            </View>
            <SvgXml
              xml={ArrowIconSVG}
              fill="#666666"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setTokenModal(true)}
          >
            <SvgXml xml={WalletIconSVG} />
            <View style={styles.itemInfo}>
              <Text style={styles.label}>
                {i18n.t('token')}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <SvgCssUri
                  height="30"
                  width="30"
                  uri={`${TOKEN_ICONS}/${token.symbol}.svg`}
                />
                <View style={{ marginLeft: 5 }}>
                  <View style={[styles.infoWrapper, { width: width - 120 }]}>
                    <Text style={styles.nameAmountText}>
                      {token.symbol}
                    </Text>
                    <Text style={styles.nameAmountText}>
                      {fromZil(token.balance[networkState.selected], token.decimals)}
                    </Text>
                  </View>
                  <View style={[styles.infoWrapper, {
                    marginBottom: 15,
                    width: width - 120
                  }]}>
                    <Text style={styles.addressAmount}>
                      {token.name}
                    </Text>
                    <Text style={styles.addressAmount}>
                      {converted}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <SvgXml
              xml={ArrowIconSVG}
              fill="#666666"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.wrapper, styles.receiving]}>
          <SvgXml xml={ReceiveIconSVG} />
          <Text style={styles.receivinglabel}>
            {i18n.t('transfer_view0')}
          </Text>
          <SvgXml
            xml={ArrowIconSVG}
            fill="#666666"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <View style={[styles.wrapper, {
          marginTop: 30,
          padding: 15
        }]}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <SvgXml xml={ReceiveIconSVG} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('transfer_amount')}
                placeholderTextColor="#8A8A8F"
                onChangeText={() => null}
              />
              <Text>
                <Text style={[styles.nameAmountText, { color: '#8A8A8F' }]}>
                  {token.symbol}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.percentWrapper}>
            <TouchableOpacity>
              <Text style={styles.percent}>
                25%
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.percent}>
                50%
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.percent}>
                100%
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          width: '100%',
          alignItems: 'center',
          marginTop: '10%'
        }}>
          <CustomButton
            style={{ width: width / 1.5 }}
            title={i18n.t('restore_btn')}
          />
        </View>
      </KeyboardAwareScrollView>
      <TokensModal
        title={i18n.t('transfer_modal_title0')}
        visible={tokenModal}
        network={networkState.selected}
        tokens={tokensState.identities}
        selected={selectedToken}
        onTriggered={() => setTokenModal(false)}
        onSelect={setSelectedToken}
      />
      <AccountsModal
        title={i18n.t('transfer_modal_title1')}
        visible={isAccountModal}
        selected={selectedAccount}
        onTriggered={() => setIsAccountModal(false)}
        accounts={accountState.identities}
        onSelected={setSelectedAccount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black
  },
  wrapper: {
    backgroundColor: theme.colors.gray
  },
  item: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemInfo: {
    alignItems: 'flex-start',
    width: width - 90,
    borderBottomWidth: 1,
    borderColor: theme.colors.black
  },
  arrowIcon: {
    transform: [{ rotate: '-90deg'}],
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    lineHeight: 21,
    color: '#8A8A8F',
    marginBottom: 7
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 100
  },
  nameAmountText: {
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.white
  },
  addressAmount: {
    fontSize: 13,
    lineHeight: 17,
    color: '#8A8A8F'
  },
  receiving: {
    marginTop: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  receivinglabel: {
    fontSize: 16,
    lineHeight: 21,
    width: width - 100,
    color: '#8A8A8F'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1
  },
  textInput: {
    fontSize: 17,
    lineHeight: 22,
    padding: 10,
    color: theme.colors.white,
    width: '90%'
  },
  percentWrapper: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 5,
    width: width / 2,
    marginLeft: 8
  },
  percent: {
    color: theme.colors.primary,
    fontSize: 16,
    lineHeight: 21
  }
});
