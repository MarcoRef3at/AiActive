const express = require('express');
const router = express.Router();
const {
  creatBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
} = require('../controllers/bootcamps');
router.route('/').get(getBootcamps).post(creatBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// router.get('/:id', (req, res) => {
//   res.status(200).json({
//     success: true,
//     msg: `Get bootcamp ${req.params.id}`,
//   });
// });

module.exports = router;
