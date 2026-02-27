document.addEventListener('DOMContentLoaded', () => {
    const passwordInputs = Array.from(document.querySelectorAll('input[type="password"]'));
    passwordInputs.forEach((input, idx) => {
        if (!(input instanceof HTMLInputElement)) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'password-input-wrap';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'password-toggle-btn';
        btn.setAttribute('aria-label', 'Tampilkan password');
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
        btn.dataset.target = input.id || `passwordField${idx + 1}`;
        if (!input.id) input.id = btn.dataset.target;

        btn.addEventListener('click', () => {
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.setAttribute('aria-pressed', isHidden ? 'true' : 'false');
            btn.setAttribute('aria-label', isHidden ? 'Sembunyikan password' : 'Tampilkan password');
            btn.innerHTML = isHidden
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';
        });

        wrapper.appendChild(btn);
    });
});
