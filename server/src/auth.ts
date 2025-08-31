import { Hono } from 'hono';

const authRoutes = new Hono();

const store = new Map<string, { email: string; password: string }>();

authRoutes.post('/sign-up', async (c) => {
  const { email, password } = await c.req.json<{
    email: string;
    password: string;
  }>();

  if (store.has(email)) {
    return c.json({ message: 'User already exists' }, 400);
  }

  store.set(email, { email, password });

  return c.json({
    data: {
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
      email,
    },
    message: 'User signed in successfully',
  });
});

export default authRoutes;
