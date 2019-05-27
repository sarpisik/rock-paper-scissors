import Container from '../container';
import Title from '../title';

class Board extends Container {
  constructor(title, content, classes) {
    super('div', `board ${classes}`);
    this.title = new Title(title);
    this.content = new Title(content);
    this.title.setParent(this.element);
    this.content.setParent(this.element);
  }
  updateScore = score => {
    this.content.updateContent(score);
  };
}

class RoundBoard extends Board {
  constructor() {
    super('Round:', 1, 'row');
    this.title.setElementClass('m-1');
    this.content.setElementClass('m-1');
  }
}

class ScoreBoard extends Board {
  constructor(title) {
    super(title, 0, 'text-center m-1');
    this.title.setElementClass('underline m-b-1');
  }
}

export { RoundBoard, ScoreBoard };
