import { TestBed } from '@angular/core/testing';

import { BROWSER_STORAGE, LocalStorage } from './local-storage';

describe('LocalStorage', () => {
  let service: LocalStorage;
  let storage: jasmine.SpyObj<Storage>;

  let dataStore: Map<string, string>;

  beforeEach(() => {
    dataStore = new Map<string, string>();
    storage = jasmine.createSpyObj<Storage>('Storage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    storage.getItem.and.callFake((key: string) => {
      return dataStore.get(key) || null;
    });
    storage.setItem.and.callFake((key: string, value: string) => {
      dataStore.set(key, value);
    });
    storage.removeItem.and.callFake((key: string) => {
      dataStore.delete(key);
    });

    TestBed.configureTestingModule({
      providers: [{ provide: BROWSER_STORAGE, useValue: storage }],
    });
    service = TestBed.inject(LocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item from local storage', () => {
    const testKey = 'testKey';
    const testValue = { name: 'Test', value: 123 };

    service.setItem(testKey, testValue);
    const retrievedValue = service.getItem<typeof testValue>(testKey);

    expect(retrievedValue).toEqual(testValue);
  });

  it('should remove item from local storage', () => {
    const testKey = 'testKeyToRemove';
    const testValue = { name: 'ToRemove', value: 456 };

    service.setItem(testKey, testValue);
    service.removeItem(testKey);
    const retrievedValue = service.getItem<typeof testValue>(testKey);

    expect(retrievedValue).toBeNull();
  });
});
