const express = require('express')
const router = express.Router()
const axios = require('axios');
const Employee = require('../models/employee.model')
const { generateCrudMethods } = require('../services')
const employeeCrud = generateCrudMethods(Employee)
const { validateDbId, raiseRecord404Error } = require('../middlewares');


router.get('/', (req, res, next) => {
    employeeCrud.getAll()
        .then(data => res.send(data.reverse()))
        .catch(err => next(err))
})

router.get('/:id', validateDbId, (req, res, next) => {
    employeeCrud.getById(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    employeeCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/:id', validateDbId, (req, res) => {
    employeeCrud.update(req.params.id, req.body)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/:id', validateDbId, (req, res) => {
    employeeCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

// OpenAI Chat Completion Route
router.post('/openai', async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Invalid request: ask again.' });
  }

  try {
    const openaiResponse = await axios.post(
      process.env.CHAT_GPT_URL,
      {
        model: 'gpt-4o-mini',
        messages: [{role: "user", content: messages}],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHAT_GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(openaiResponse.data);
  } catch (error) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'Failed to call OpenAI API', details: error.message });
  }
});

// Deepseek Chat Completion Route
router.post('/deepseek', async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Invalid request: ask again.' });
  }

  try {
    const openaiResponse = await axios.post(
      process.env.DEEPSEEK_URL,
      {
        model: "deepseek/deepseek-r1:free",
        messages: [{role: "user", content: messages}],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(openaiResponse.data);
  } catch (error) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'Failed to call OpenAI API', details: error.message });
  }
});

module.exports = router