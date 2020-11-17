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

import { ContactsPage } from 'app/pages/settings/contacts';
import { ConnectionsPage } from 'app/pages/settings/connections';
import { AdvancedPage } from 'app/pages/settings/advanced';
import { AboutPage } from 'app/pages/settings/about';
import { SecurityPage } from 'app/pages/settings/security';
import { NetworkPage } from 'app/pages/settings/network';
import { GeneralPage } from 'app/pages/settings/general';

import { headerOptions } from 'app/config';

const SettingsStack = createStackNavigator();
export const Settings: React.FC = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      name="Contacts"
      component={ContactsPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="Connections"
      component={ConnectionsPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="Advanced"
      component={AdvancedPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="About"
      component={AboutPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="Security"
      component={SecurityPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="Network"
      component={NetworkPage}
      options={headerOptions}
    />
    <SettingsStack.Screen
      name="General"
      component={GeneralPage}
      options={headerOptions}
    />
  </SettingsStack.Navigator>
);
