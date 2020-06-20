const addThenDelClass = (el, className, duration) => {
  el.classList.add(className);
  setTimeout(() => {
    el.classList.remove(className);
  }, duration);
}

export default addThenDelClass;