const express = require("express");
const router = express.Router();
const Question = require("./models/Question"); // includes our question model
const Categories = require("./models/Categories"); // category model
// get all quiz questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get one quiz question
router.get("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.findOne({ _id });
    if (!question) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// create one quiz question
router.post("/questions", async (req, res) => {
  try {
    const {
      description,
      correct,
      option_one,
      option_two,
      option_three,
      option_four,
    } = req.body;

    const alternatives = [
      { text: option_one, isCorrect: false },
      { text: option_two, isCorrect: false },
      { text: option_three, isCorrect: false },
      { text: option_four, isCorrect: false },
    ];
    alternatives[correct].isCorrect = true;
    const question = await Question.create({
      description,
      alternatives,
    });

    return res.json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// update one quiz question
router.put("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { description, alternatives } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        alternatives,
      });
      return res.status(201).json(question);
    } else {
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// delete one quiz question
router.delete("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.deleteOne({ _id });

    if (question.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get number of questions
router.get("/numberOfQuestions", async (req, res) => {
  try {
    const questions = await Question.countDocuments();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get all categories
router.get("/categories", async (req, res) => {
  try {
    const ctg = await Categories.find();
    return res.status(200).json(ctg);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// create category
router.post("/categories", async (req, res) => {
  try {
    const { categoryName } = req.body;

    const ctg = await Categories.create({
      categoryName,
    });

    return res.json(ctg);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// update a category
router.put("/categories/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { categoryName } = req.body;

    let ctg = await Categories.findOne({ _id });

    if (!ctg) {
      ctg = await Question.create({
        categoryName,
      });
      return res.status(201).json(ctg);
    } else {
      ctg.categoryName = categoryName;
      await ctg.save();
      return res.status(200).json(ctg);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// delete one category
router.delete("/categories/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const ctg = await Categories.deleteOne({ _id });

    if (ctg.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
module.exports = router;
