import Container from '../container';

class Row extends Container {
  constructor(classes = '') {
    super('div', `row m-t-1 ${classes}`);
    this.setParent(this.container);
  }
}

export default Row;
