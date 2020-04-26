/**
 * GET /
 */
exports.index = (req, res,name) => {
  res.render('dynamic', {
    title: 'Dynamic',
    name: name
  });
};


