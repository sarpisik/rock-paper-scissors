class Container {
  constructor(type, classes = '', content = '') {
    this.container = document.querySelector('main');
    this.createElementWithClass(type, classes);
    this.updateContent(content);
  }
  setParent(parent) {
    parent.appendChild(this.element);
  }
  createElementWithClass(type, classes) {
    this.createElement(type);
    this.setElementClass(classes);
  }
  setElementClass(classes) {
    this.element.setAttribute('class', classes);
  }
  createElement(type) {
    this.element = document.createElement(type);
  }
  updateContent(content) {
    this.element.innerText = content;
  }
}

export default Container;
