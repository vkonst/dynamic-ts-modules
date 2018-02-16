const processor = function (req, res, next) {
  res.body = `<h2>Hello from handlerB!</h2>`;
  console.log('\nhello from "handlerB"\n');
  next();
};

export default processor;