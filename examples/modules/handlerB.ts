const processor = function (req, res, next) {
  console.log('\nhello from "handlerB"\n');
  next();
};

export default processor;