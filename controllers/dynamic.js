/**
 * GET /
 */
exports.index = (req, res,name) => {
  res.render('dynamic', {
    title: 'Dynamic',
    name: name
  });
};


exports.error = (req, res,name) => {
  res.render('error', {
    title: 'Error',
    name: name
  });
};


