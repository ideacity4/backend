const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/IdeaControllers');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, ideaController.createIdea);
router.get('/', ideaController.getAllIdeas);
router.get('/my', authMiddleware, ideaController.getMyIdeas);
router.put('/:id', authMiddleware, ideaController.updateIdea);
router.delete('/:id', authMiddleware, ideaController.deleteIdea);

module.exports = router;
