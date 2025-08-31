import { Hono } from 'hono';

const authRoutes = new Hono();

const store = new Map<
  string,
  { name: string; email: string; password: string }
>();

authRoutes.post('/sign-up', async (c) => {
  const { name, email, password } = await c.req.json<{
    name: string;
    email: string;
    password: string;
  }>();

  if (!name) {
    return c.json({ message: 'Name is required' }, 400);
  }

  if (!email) {
    return c.json({ message: 'Email is required' }, 400);
  }

  if (!password) {
    return c.json({ message: 'Password is required' }, 400);
  }

  if (store.has(email)) {
    return c.json({ message: 'User already exists' }, 400);
  }

  store.set(email, { name, email, password });

  return c.json({
    data: {
      name,
      email,
    },
    message: 'User registered successfully',
  });
});

authRoutes.post('/sign-in', async (c) => {
  const { email, password } = await c.req.json<{
    email: string;
    password: string;
  }>();

  const user = store.get(email);

  if (!user || user.password !== password) {
    return c.json({ message: 'Invalid email or password' }, 401);
  }

  return c.json({
    data: {
      name: user.name,
      email,
    },
    message: 'User signed in successfully',
  });
});

authRoutes.get('/users', (c) => {
  return c.json({
    users: Array.from(store.values()),
  });
});

export default authRoutes;
