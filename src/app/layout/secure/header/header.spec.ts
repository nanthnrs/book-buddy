import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { bookFeatureKey, initialBookState } from '../../../state/book/book.reducer';
import { selectLoadingBooks } from '../../../state/book/book.selectors';
import { BookActions } from '../../../state/book/book.actions';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let nativeElement: HTMLElement;
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState
          }
        })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = nativeElement.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Book Buddy');
  })

  it('should render refresh button', () => {
    const button = nativeElement.querySelector('#btn-refresh');
    expect(button).toBeTruthy();

    const icon = button?.querySelector('#btn-refresh i.bi');
    expect(icon).toBeTruthy();
    expect(icon?.className).toContain('bi-arrow-clockwise');
  });

  it('should disable refresh button when loading is true', () => {
    store.overrideSelector(selectLoadingBooks, true);
    store.refreshState();
    fixture.detectChanges();

    const button = nativeElement.querySelector('#btn-refresh') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable refresh button when loading is false', () => {
    store.overrideSelector(selectLoadingBooks, false);
    store.refreshState();
    fixture.detectChanges();

    const button = nativeElement.querySelector('#btn-refresh') as HTMLButtonElement;
    expect(button.disabled).toBeFalse();
  });

  it('should load books when refresh button is clicked', () => {
    // Make sure loading is false to enable the button
    store.overrideSelector(selectLoadingBooks, false);
    store.refreshState();
    fixture.detectChanges();

    const button = nativeElement.querySelector('#btn-refresh') as HTMLButtonElement;
    spyOn(store, 'dispatch').and.callThrough();

    button.click();

    expect(store.dispatch).toHaveBeenCalledOnceWith(BookActions.loadBooks());
  });
});
