/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import {
  searchEngineStore,
  searchEngineStoreUpdate,
  searchEngineStoreReset
} from './store';
import { STORAGE_FIELDS } from 'app/config';
import { buildObject, MobileStorage } from 'app/lib';
import { SearchEngineStoreType } from 'types';
import { deppUnlink } from 'app/utils';

export class SearchController {
  public readonly store = searchEngineStore;
  private readonly _storage: MobileStorage;

  constructor(storage: MobileStorage) {
    this._storage = storage;
  }

  public async reset() {
    searchEngineStoreReset();

    await this._update(this.store.get());
  }

  public async sync() {
    const data = await this._storage.get<string>(
      STORAGE_FIELDS.SEARCH_ENGINE
    );

    if (typeof data !== 'string') {
      return this.reset();
    }

    try {
      await this._update(JSON.parse(data));
    } catch {
      return this.reset();
    }
  }

  public async changeEngine(index: number) {
    if (index < 0) {
      throw new Error('index < 0');
    }

    const state = this.store.get();

    state.selected = index;

    return this._update(state);
  }

  public toggleDweb(value: boolean) {
    const state = this.store.get();

    state.dweb = value;

    return this._update(state);
  }

  private async _update(state: SearchEngineStoreType) {
    searchEngineStoreUpdate(deppUnlink(state));

    await this._storage.set(
      buildObject(STORAGE_FIELDS.SEARCH_ENGINE, state)
    );
  }
}
