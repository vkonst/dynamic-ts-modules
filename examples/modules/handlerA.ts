const processor = function (req, res, next) {
  res.body = `<h2>Hello from handlerA!</h2>`;
  console.log('\nhello from "handlerA"\n');
  next();
};

export default processor;