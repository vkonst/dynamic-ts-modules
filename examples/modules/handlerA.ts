const processor = function (req, res, next) {
  console.log('\nhello from "handlerA"\n');
  next();
};

export default processor;