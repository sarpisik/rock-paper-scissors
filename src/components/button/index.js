import Container from '../container';
import paper from '../../../assets/images/paper.png';
import rock from '../../../assets/images/rock.png';
import scissors from '../../../assets/images/scissors.png';

const imgList = {
  paper,
  rock,
  scissors
};

class Button extends Container {
  constructor(callBack) {
    // Create button element
    super('button', 'btn');
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
    this.img.classList.add('icon');
    this.element.appendChild(this.img);
  }
}

class RestartGameButton extends Button {
  constructor(name, callBack) {
    super(callBack);
    this.element.classList.add('m-t-1');
    this.updateContent(name);
  }
}
export { SelectionButton, RestartGameButton };
