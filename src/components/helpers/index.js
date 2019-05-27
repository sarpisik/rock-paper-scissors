export const renderChildren = (parent, children) => {
  children.forEach(child => {
    child.setParent(parent);
  });
};

export const toFirstLetterUpperCase = str =>
  str.charAt(0).toUpperCase() + str.slice(1);
