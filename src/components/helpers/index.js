const getYear = () => new Date().getFullYear();

export const setElementYear = element => {
  const currentYear = getYear();
  element.innerText = currentYear;
};
export const renderChildren = (parent, children) => {
  children.forEach(child => {
    child.setParent(parent);
  });
};

export const toFirstLetterUpperCase = str =>
  str.charAt(0).toUpperCase() + str.slice(1);
