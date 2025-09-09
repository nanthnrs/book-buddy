import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auth': emptyProps(),
    'Set Auth': props<{ name: string; email: string }>(),
    'Clear Auth': emptyProps(),
  },
});
