const processor = function (req, res, next) {
  res.body = `
        <h2>Hello from handlerB!</h2>
        <span>to get message from "handlerA" please set to "A" the env variable DYNAMIC_HANDLER</span>
    `;
  console.log('\nhello from "handlerB"\n');
  next();
};

export default processor;