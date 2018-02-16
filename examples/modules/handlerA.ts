const processor = function (req, res, next) {
  res.body = `
        <h2>Hello from handlerA!</h2>
        <span>to get message from "handlerB" please set to "B" the env variable DYNAMIC_HANDLER</span>
    `;
  console.log('\nhello from "handlerA"\n');
  next();
};

export default processor;