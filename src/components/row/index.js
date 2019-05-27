import Container from '../container';

class Row extends Container {
  constructor() {
    super('div', 'row');
    this.setParent(this.container);
  }
}

export default Row;
