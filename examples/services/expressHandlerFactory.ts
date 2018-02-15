export default class Factory {

  constructor(){
    this.counter = 0;
  }

  protected counter: number;

  public get handler() {
    return this.getHandler(`handler #${this.counter++}`);
  }

  private getHandler(id: string) {
    return function (req, res, next) {
      console.log(`Hello from "${id}"`);
      next();
    }
  }
}
