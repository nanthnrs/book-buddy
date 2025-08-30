import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Books } from './books';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { bookFeatureKey, initialBookState } from '../../state/book/book.reducer';
import { selectLoadingBooks } from '../../state/book/book.selectors';



describe('Books', () => {
  let component: Books;
  let fixture: ComponentFixture<Books>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Books],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState,
          },
        }),
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(Books);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading when books are loading', () => {
    store.overrideSelector(selectLoadingBooks, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingElement = nativeElement.querySelector('#loading-books');
    expect(loadingElement).toBeTruthy();
    expect(loadingElement?.textContent).toContain('Loading...');
  });


});
