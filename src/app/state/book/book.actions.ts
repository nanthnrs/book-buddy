import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../../core/models/book';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Set Books': props<{ data: Book[] }>(),
    'Set Favorite': props<{ id: string, isFavorite: boolean }>(),
  }
});
