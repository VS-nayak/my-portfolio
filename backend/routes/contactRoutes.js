const express = require('express');
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST - Save Contact Message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            message: 'Message saved successfully!',
            contact: newContact
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

// GET - View All Contact Messages (Protected)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: 'Contact messages fetched successfully!',
            contacts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});
// PUT - Update Read/Unread Status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { isRead } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        message: 'Message not found'
      });
    }

    res.json({
      message: 'Message status updated!',
      contact
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// DELETE - Remove Contact Message
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: 'Message not found'
      });
    }

    res.json({
      message: 'Message deleted successfully!'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;