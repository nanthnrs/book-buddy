import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auth': emptyProps(),
    'Load Auth Success': props<{ name: string; email: string }>(),
    'Load Auth Failure': emptyProps(),
  },
});
