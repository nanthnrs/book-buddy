import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Secure } from './secure';
import { Store } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import {
  bookFeatureKey,
  initialBookState,
} from '../../state/book/book.reducer';
import { BookActions } from '../../state/book/book.actions';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Secure', () => {
  let component: Secure;
  let fixture: ComponentFixture<Secure>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Secure],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState,
          },
        }),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(Secure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-main')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should dispatch loadBooks action on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(BookActions.loadBooks());
  });
});
