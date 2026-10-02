const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const menuItems = document.querySelectorAll('.has-menu');
const navLinks = document.querySelectorAll('.primary-nav a');

function closeSubmenus() {
  menuItems.forEach((item) => {
    item.classList.remove('is-open');
    const button = item.querySelector('.nav-dropdown-toggle');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      closeSubmenus();
    }
  });
}

menuItems.forEach((menuItem) => {
  const dropdownToggle = menuItem.querySelector('.nav-dropdown-toggle');

  if (!dropdownToggle) {
    return;
  }

  dropdownToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = menuItem.classList.contains('is-open');

    closeSubmenus();
    if (!isOpen) {
      menuItem.classList.add('is-open');
      dropdownToggle.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.has-menu')) {
    closeSubmenus();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (primaryNav && primaryNav.classList.contains('is-open')) {
      primaryNav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
    closeSubmenus();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (primaryNav) {
      primaryNav.classList.remove('is-open');
    }
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
    closeSubmenus();
  });
});
