document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


document.querySelectorAll('.skills .tag').forEach(tag => {
  tag.setAttribute('role', 'button');
  tag.setAttribute('tabindex', '0');
  tag.setAttribute('aria-pressed', 'false');

  const toggle = () => {
    const isActive = tag.classList.toggle('active');
    tag.setAttribute('aria-pressed', String(isActive));
  };

  tag.addEventListener('click', toggle);
  tag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

const tags = document.querySelectorAll('.skills .tag');
const boxes = document.querySelectorAll('.skill-box');

let fixedBox = null; // caixa fixada por clique

function closeAll() {
  boxes.forEach(box => (box.style.display = 'none'));
  tags.forEach(tag => tag.classList.remove('active'));
}

tags.forEach(tag => {
  const box = document.getElementById(tag.dataset.skill);

  // === HOVER: preview ===
  tag.addEventListener('mouseenter', () => {
    if (fixedBox && fixedBox !== box) return;

    closeAll();
    box.style.display = 'block';
  });

  tag.addEventListener('mouseleave', () => {
    if (!fixedBox) {
      box.style.display = 'none';
    }
  });

  // === CLICK: fixa ===
  tag.addEventListener('click', () => {
    // se clicar na mesma já fixada → fecha
    if (fixedBox === box) {
      closeAll();
      fixedBox = null;
      return;
    }

    closeAll();
    box.style.display = 'block';
    tag.classList.add('active');
    fixedBox = box;
  });
});