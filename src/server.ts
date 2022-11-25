import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import { sample_foods, sample_tags, sample_users } from './data';

dotenv.config();
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

app.get('/', (req, res) => {
  res.send('Hallo das ist die erste Nachicht');
});

app.get('/api/foods', (req, res) => {
  res.status(200).json(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.status(201).json(foods);
});

app.get('/api/foods/tags', (req, res) => {
  res.status(201).json(sample_tags);
});

app.get('/api/foods/tag/:tagName', (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.status(201).json(foods);
});

app.get('/api/foods/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const food = sample_foods.find((food) => food.id == foodId);
  res.status(201).json(food);
});

app.post('/api/users/login', (req, res) => {
  const body = req.body;

  const user = sample_users.find(
    (user) => user.email === body.email && user.password === body.password
  );

  if (user) {
    res.status(201).json(generateTokenResponse(user));
  } else {
    res.status(400).send('User name or password is not valid!!!');
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    'aSecreatKey',
    {
      expiresIn: '1d',
    }
  );

  user.token = token;
  return user;
};

app.listen(port, () => {
  console.log(`server ist running at http://localhost:${port}`);
});
