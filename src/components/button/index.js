import Container from '../container';
import paper from '../../../assets/images/paper.png';
import rock from '../../../assets/images/rock.png';
import scissors from '../../../assets/images/scissors.png';
import Title from '../title';

const imgList = {
  paper,
  rock,
  scissors
};

class Button extends Container {
  constructor(callBack) {
    // Create button element
    super('button', 'btn m-1 padding-1');
    // Set event handler from Game Class
    this.element.addEventListener('click', callBack);
  }
}

class SelectionButton extends Button {
  constructor(name, callBack) {
    super(callBack);
    // Set name attribute
    this.element.name = name;
    // Create img element
    this.img = new Image(50, 50);
    // Set image content
    this.img.src = imgList[name];
    this.element.appendChild(this.img);
    // Create h3 element
    this.name = new Title(name);
    this.name.setParent(this.element);
  }
}

class RestartGameButton extends Button {
  constructor(name, callBack) {
    super(callBack);
    this.updateContent(name);
  }
}
export { SelectionButton, RestartGameButton };
