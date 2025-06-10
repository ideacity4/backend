const Idea = require('../models/Idea');

// Create a new idea (only by logged-in user)
exports.createIdea = async (req, res) => {
  try {
    const idea = new Idea({
      ...req.body,
      seller_id: req.user._id
    });
    const ideaPrice = idea.price;
    idea.price = "$"+ ideaPrice;
    await idea.save();
    res.status(201).json({
      message: "Idea Created Successfully",
      idea: idea
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create idea" });
  }
};

// Get all ideas (public)
exports.getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate('seller_id', 'email name avatar'); // optional: populate seller info
    res.status(200).json(ideas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
};

// Update idea (only by seller)
exports.updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);

    if (!idea) return res.status(404).json({ error: 'Idea not found' });

    if (idea.seller_id.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized: Not your idea' });

    const updatedIdea = await Idea.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(updatedIdea);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update idea' });
  }
};

// Delete idea (only by seller)
exports.deleteIdea = async (req, res) => {
    try {
      const idea = await Idea.findById(req.params.id);
  
      if (!idea) {
        return res.status(404).json({ error: "Idea not found" });
      }
  
      // Allow only the owner or an admin
      if (idea.seller_id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ error: "Not authorized to delete this idea" });
      }
  
      await idea.deleteOne();
      res.status(200).json({ message: "Idea deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete idea" });
    }
  };
  

// Optional: Get all ideas by a specific user (logged-in seller)
exports.getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ seller_id: req.user.id });
    res.status(200).json(ideas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your ideas' });
  }
};
