import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config()

const app = express()
app.use(cors({
  origin: 'https://verzai-personal-assistant-gpt.onrender.com'
}));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Well hello there!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `You are a very helpful and knowledgeable assistant designed to output programmable languages and examples`,
      temperature: 1.2,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text
    });

  } catch (error) {
    console.log(error)
    res.status(500).send( error || 'Cannot compute...cannot compute');
  }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
