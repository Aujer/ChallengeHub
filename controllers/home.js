/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('dynamic', {
    title: 'Dynamic'
  });
};


