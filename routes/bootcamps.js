const express = require('express');
const router = express.Router();
const {
  creatBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
} = require('../controllers/bootcamps');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getBootcamps)
  .post(protect, authorize('publisher', 'admin'), creatBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

// router.get('/:id', (req, res) => {
//   res.status(200).json({
//     success: true,
//     msg: `Get bootcamp ${req.params.id}`,
//   });
// });

module.exports = router;
