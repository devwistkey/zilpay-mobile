/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */

export interface Connect {
  domain: string;
  icon: string;
  title: string;
}

export interface LedgerTransport {
  descriptor: {
    id: string;
    name: string;
  }
  type: string;
}