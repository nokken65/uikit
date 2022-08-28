import type { MouseEvent } from 'react';

export async function createRipple<T extends HTMLButtonElement>(
  button: T,
  event: MouseEvent<T>,
  rippleClass: string,
) {
  const circle = document.createElement('span');
  requestAnimationFrame(() => {
    const diameter = Math.max(
      button.clientWidth || 0,
      button.clientHeight || 0,
    );
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;

    circle.classList.add(rippleClass);

    button.insertBefore(circle, button.firstChild);
  });
  setTimeout(() => {
    circle.remove();
  }, 600);
}
