export default class Factory {

  protected counter: number = 0;

  public get handler() {
    return this.getHandler(`handler #${this.counter++}`);
  }

  private getHandler(id: string) {
    return function (req, res, next) {
      res.body += `<h2>Hello from auto generated "${id}"</h2>`;
      console.log(`Hello from "${id}"`);
      next();
    }
  }
}
