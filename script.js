const buttons = document.querySelectorAll("button");
const RIPPLEANIMATIONDURATION = 800;
let mousePosition = {
  x: 0,
  y: 0,
};

const getMousePosition = (event) => {
  const mouseXPosition = parseInt(event.pageX, 10);
  const mouseYPosition = parseInt(event.pageY, 10);

  mousePosition = {
    x: mouseXPosition,
    y: mouseYPosition,
  };
};

const createRipple = (event) => {
  const element = event.target;
  const ripple = element.querySelector(".ripple");

  if (ripple)
    ripple.remove();

  if (element.firstChild !== ripple) {
    const circle = document.createElement("div");
    circle.classList.add("ripple");

    const diameter = Math.ceil(element.clientWidth + element.clientHeight);
    circle.style.height = `${diameter}px`;
    circle.style.width = `${diameter}px`;

    const radius = diameter / 2;

    const elementPosition = element.getBoundingClientRect();
    const elementYPosition = parseInt(elementPosition.top);
    const elementXPosition = parseInt(elementPosition.left);

    const { x, y } = mousePosition;

    const windowYPosition = window.scrollY;

    const top = parseInt(y - elementYPosition - radius - windowYPosition);
    const left = parseInt(x - elementXPosition - radius);

    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;

    element.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, RIPPLEANIMATIONDURATION);
  }
};

buttons.forEach((button) => {
  button.addEventListener("mousemove", getMousePosition);
  button.addEventListener("click", createRipple);
});
