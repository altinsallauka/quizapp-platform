const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // includes our question model
const Categories = require("../models/Categories"); // includes category model
const Roles = require("../models/Roles"); // includes roles model
const Results = require("../models/Results");
const auth = require("../middleware/auth");

// get all quiz questions
/**
 * @swagger
 * /questions:
 *   get:
 *     description: Get all questions
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get("/questions", auth, async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get one quiz question
router.get("/questions/:id", auth, async (req, res) => {
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
router.post("/questions", auth, async (req, res) => {
  try {
    const {
      description,
      correct,
      option_one,
      option_two,
      option_three,
      option_four,
      categoryId,
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
      categoryId,
    });

    return res.json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// update one quiz question
router.put("/questions/:id", auth, async (req, res) => {
  try {
    // const _id = req.params.id;
    const { description, alternatives, _id, categoryId } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        alternatives,
        categoryId,
      });
      return res.status(201).json(question);
    } else {
      question.description = description;
      question.alternatives = alternatives;
      question.categoryId = categoryId;
      await question.save();

      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// delete one quiz question
router.delete("/questions/:id", auth, async (req, res) => {
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
router.get("/numberOfQuestions", auth, async (req, res) => {
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
// get one category
router.get("/categories/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const ctg = await Categories.findOne({ _id });
    if (!ctg) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(ctg);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// create category
router.post("/categories", auth, async (req, res) => {
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
router.put("/categories/:id", auth, async (req, res) => {
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
router.delete("/categories/:id", auth, async (req, res) => {
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

// get all roles
router.get("/roles", async (req, res) => {
  try {
    const userRole = await Roles.find();
    return res.status(200).json(userRole);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get one role
router.get("/roles/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const userRole = await Roles.findOne({ _id });
    if (!userRole) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(userRole);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// create role
router.post("/roles", auth, async (req, res) => {
  try {
    const { role } = req.body;

    const userRole = await Roles.create({
      role,
    });

    return res.json(userRole);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// update role
router.put("/roles/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const { role } = req.body;

    let userRole = await Roles.findOne({ _id });

    if (!userRole) {
      userRole = await Roles.create({
        role,
      });
      return res.status(201).json(userRole);
    } else {
      userRole.role = role;
      await userRole.save();
      return res.status(200).json(userRole);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// delete role
router.delete("/roles/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const userRole = await Roles.deleteOne({ _id });

    if (userRole.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// function to randomize questions array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// get all questions by category
router.get("/questions/:categoryId/:studentName", async (req, res) => {
  try {
    // const categoryId = req.params.categoryId;
    // var query = { categoryId };
    const questions = await Question.find(
      { categoryId: req.params.categoryId },
      function (err, result) {
        if (err) throw err;
        // console.log("Questions success.");
      }
    );
    console.log(JSON.stringify(req.cookies));

    shuffleArray(questions);
    const questions10 = questions.slice(0, 10);
    // res.cookie(
    //   "quiz_user_data",
    //   JSON.stringify({ user: req.params.studentName, questions: questions10 }),
    //   { maxAge: 86400 }
    // );
    return res.status(200).json(questions10);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// post result
router.post("/results", async (req, res) => {
  try {
    const { studentName, score } = req.body;

    const results = await Results.create({
      studentName,
      score,
    });

    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// get all results
router.get("/results", auth, async (req, res) => {
  try {
    const results = await Results.find();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
// delete one result
router.delete("/results/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const result = await Results.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
module.exports = router;

// get all questions by category
router.get("/questions/:categoryId/:studentName", async (req, res) => {
  try {
    // const categoryId = req.params.categoryId;
    // var query = { categoryId };
    const questions = await Question.find(
      { categoryId: req.params.categoryId },
      function (err, result) {
        if (err) throw err;
        // console.log("Questions success.");
      }
    );
    console.log(JSON.stringify(req.cookies));

    shuffleArray(questions);
    const questions10 = questions.slice(0, 10);
    // res.cookie(
    //   "quiz_user_data",
    //   JSON.stringify({ user: req.params.studentName, questions: questions10 }),
    //   { maxAge: 86400 }
    // );
    return res.status(200).json(questions10);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
