import Container from '../container';

class Title extends Container {
  constructor(content, classes) {
    super('h3', classes, content);
  }
}

export default Title;
