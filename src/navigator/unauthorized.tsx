/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LetStartPage from 'app/pages/let-start';
import GetStartedPage from 'app/pages/get-started';
import LockPage from 'app/pages/lock';
import RestorePage from 'app/pages/restore';
import PrivacyPage from 'app/pages/privacy';
import MnemonicGenPage from 'app/pages/mnemonic-gen';
import MnemonicVerifyPage from 'app/pages/mnemonic-verify';
import SetupPasswordPage from 'app/pages/setup-password';
import InitSuccessfullyPage from 'app/pages/init-successfully';

import { headerOptions } from 'app/config';

const UnauthorizedStack = createStackNavigator();
export const Unauthorized: React.FC = () => (
  <UnauthorizedStack.Navigator>
    <UnauthorizedStack.Screen
      name="GetStarted"
      component={GetStartedPage}
      options={{
        header: () => null,
        title: ''
      }}
    />
    <UnauthorizedStack.Screen
      name="Lock"
      component={LockPage}
      options={{
        header: () => null,
        title: ''
      }}
    />
    <UnauthorizedStack.Screen
      name="SetupPassword"
      component={SetupPasswordPage}
      options={{
        header: () => null,
        title: ''
      }}
    />
    <UnauthorizedStack.Screen
      name="InitSuccessfully"
      component={InitSuccessfullyPage}
      options={{
        header: () => null,
        title: ''
      }}
    />
    <UnauthorizedStack.Screen
      name="Privacy"
      component={PrivacyPage}
      options={headerOptions}
    />
    <UnauthorizedStack.Screen
      name="LetStart"
      component={LetStartPage}
      options={headerOptions}
    />
    <UnauthorizedStack.Screen
      name="Restore"
      component={RestorePage}
      options={headerOptions}
    />
    <UnauthorizedStack.Screen
      name="Mnemonic"
      component={MnemonicGenPage}
      options={headerOptions}
    />
    <UnauthorizedStack.Screen
      name="MnemonicVerif"
      component={MnemonicVerifyPage}
      options={headerOptions}
    />
  </UnauthorizedStack.Navigator>
);
