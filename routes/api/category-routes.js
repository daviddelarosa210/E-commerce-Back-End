const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated products
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoriesData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its id and include its associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its id
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its id
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found with this id' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
