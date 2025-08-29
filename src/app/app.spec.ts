import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { bookFeatureKey, initialBookState } from './state/book/book.reducer';
import { Store } from '@ngrx/store';
import { BookActions } from './state/book/book.actions';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let store: Store;

  const initialState = {
    [bookFeatureKey]: initialBookState
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
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
