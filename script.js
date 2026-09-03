// Dashboard sidebar toggle
const dashboardMenuToggle = document.getElementById('menuToggle');
const dashboardSidebar = document.querySelector('.dashboard-sidebar');
const dashboardShell = document.querySelector('.dashboard-shell');

if (dashboardMenuToggle && dashboardSidebar) {
  dashboardMenuToggle.addEventListener('click', () => {
    dashboardSidebar.classList.toggle('open');
    if (dashboardShell) {
      dashboardShell.classList.toggle('sidebar-open');
    }
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!dashboardMenuToggle.contains(e.target) && !dashboardSidebar.contains(e.target)) {
      dashboardSidebar.classList.remove('open');
      if (dashboardShell) {
        dashboardShell.classList.remove('sidebar-open');
      }
    }
  });
}

// Homepage menu toggle
const menuToggle = document.querySelector('.menu-toggle:not(#menuToggle)');
const nav = document.querySelector('.main-nav');
const navActions = document.querySelector('.nav-actions');

if (menuToggle && nav && navActions) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));

    nav.style.display = expanded ? 'none' : 'flex';
    navActions.style.display = expanded ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    navActions.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = 'calc(100% + 10px)';
    nav.style.left = '16px';
    nav.style.right = '16px';
    nav.style.background = '#ffffff';
    nav.style.border = '1px solid rgba(17, 24, 39, 0.08)';
    nav.style.borderRadius = '18px';
    nav.style.padding = '18px';
    nav.style.boxShadow = '0 24px 60px rgba(17, 24, 39, 0.08)';
    navActions.style.position = 'absolute';
    navActions.style.top = 'calc(100% + 210px)';
    navActions.style.left = '16px';
    navActions.style.right = '16px';
    navActions.style.background = '#ffffff';
    navActions.style.border = '1px solid rgba(17, 24, 39, 0.08)';
    navActions.style.borderRadius = '18px';
    navActions.style.padding = '18px';
    navActions.style.boxShadow = '0 24px 60px rgba(17, 24, 39, 0.08)';
  });
}

const pageMenuToggle = document.getElementById('menuToggle');
const pageMenu = document.getElementById('pageMenu');

if (pageMenuToggle && pageMenu && !document.querySelector('.dashboard-sidebar')) {
  pageMenuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const expanded = pageMenu.classList.toggle('open');
    pageMenuToggle.setAttribute('aria-expanded', String(expanded));
  });

  document.addEventListener('click', (event) => {
    if (!pageMenu.contains(event.target) && !pageMenuToggle.contains(event.target)) {
      pageMenu.classList.remove('open');
      pageMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const form = document.querySelector('.cta-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('input');
    if (!emailInput.value.trim()) {
      emailInput.focus();
      return;
    }

    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Thanks!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
}

const authForm = document.querySelector('.auth-form');

if (authForm) {
  authForm.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const message = document.getElementById('login-message');

    if (emailInput && passwordInput) {
      event.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        if (message) {
          message.textContent = 'Please enter both your email and password.';
          message.className = 'form-message error';
        }
        return;
      }

      if (email.toLowerCase() === 'elsafourie84@gmail.com' && password === 'jtbsky231') {
        sessionStorage.setItem('reserveBankAuthenticated', 'true');
        window.location.href = 'dashboard.html';
        return;
      }

      if (message) {
        message.textContent = 'Invalid email or password. Please try again.';
        message.className = 'form-message error';
      }
      return;
    }

    event.preventDefault();
    const button = authForm.querySelector('button');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Submitted';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1800);
    }
  });
}

const transferType = document.getElementById('transfer-type');
const internalField = document.querySelector('.internal-field');
const externalFields = document.querySelectorAll('.external-field');
const internalTransferMessage = document.getElementById('internal-transfer-message');

if (transferType) {
  const toggleTransferFields = () => {
    const isExternal = transferType.value === 'external';

    if (internalField) {
      internalField.classList.toggle('hidden', isExternal);
    }

    externalFields.forEach((field) => {
      field.classList.toggle('hidden', !isExternal);
    });

    // Show/hide internal transfer message
    if (internalTransferMessage) {
      internalTransferMessage.classList.toggle('hidden', isExternal);
    }
  };

  transferType.addEventListener('change', toggleTransferFields);
  toggleTransferFields();
}

const transferForm = document.getElementById('transfer-form');
if (transferForm) {
  const transferAmountInput = document.getElementById('transfer-amount');
  if (transferAmountInput) {
    transferAmountInput.value = '';
  }

  const transferStatus = document.getElementById('transfer-status');
  const progressBar = document.getElementById('transfer-progress-bar');
  const progressText = document.getElementById('transfer-progress-text');
  const passphraseModal = document.getElementById('passphrase-modal');
  const passphraseInput = document.getElementById('passphrase-input');
  const passphraseError = document.getElementById('passphrase-error');
  const continueButton = document.getElementById('continue-transfer');
  const cancelTransferButton = document.getElementById('cancel-transfer');
  
  // Error message modal
  const errorModal = document.getElementById('error-message-modal');
  const errorMessageText = document.getElementById('error-message-text');
  const errorMessageOk = document.getElementById('error-message-ok');
  const closeErrorMsg = document.getElementById('close-error-msg');

  // Function to show error message
  const showErrorMessage = (message) => {
    errorMessageText.textContent = message;
    errorModal.classList.remove('hidden');
  };

  // Function to hide error message
  const hideErrorMessage = () => {
    errorModal.classList.add('hidden');
  };

  // Close error message on OK button
  errorMessageOk.addEventListener('click', hideErrorMessage);

  // Close error message on X button
  closeErrorMsg.addEventListener('click', hideErrorMessage);

  // Close error message on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !errorModal.classList.contains('hidden')) {
      hideErrorMessage();
    }
  });

  transferForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const visibleRequiredFields = Array.from(
      transferForm.querySelectorAll('.field-group:not(.hidden) input, .field-group:not(.hidden) select')
    );

    const hasEmptyRequiredField = visibleRequiredFields.some((field) => !field.value.trim());
    if (hasEmptyRequiredField) {
      showErrorMessage('Please complete all required fields.');
      return;
    }

    const transferTypeValue = transferType ? transferType.value : 'internal';
    const recipientName = document.getElementById('recipient-name');
    const bankName = document.getElementById('bank-name');
    const routing = document.getElementById('routing-number');
    const accountNumber = document.getElementById('external-account-number');

    if (transferTypeValue === 'external') {
      const requiredExternalFields = [recipientName, bankName, routing, accountNumber].filter(Boolean);
      const hasEmptyExternalField = requiredExternalFields.some((field) => !field.value.trim());

      if (hasEmptyExternalField) {
        showErrorMessage('error external transfer details');
        return;
      }
    }

    const routingDigits = routing.value.trim().replace(/\D/g, '');
    const routingLength = routing.value.trim().length;

    // Routing number must be 9 or more characters to continue to the passphrase step.
    if (routingLength < 9) {
      showErrorMessage('error routing');
      return;
    }

    // Validate account number has at least 9 digits
    const accountDigits = accountNumber.value.trim().replace(/\D/g, '');
    if (accountDigits.length < 9) {
      showErrorMessage('error account number');
      return;
    }

    passphraseModal.classList.remove('hidden');
  });

  const submitPassphrase = () => {
    const value = (passphraseInput.value || '').trim();
    const normalizedValue = value.toLowerCase();

    if (normalizedValue !== 'granttransfer#26') {
      passphraseError.textContent = 'Please enter the correct passphrase.';
      return;
    }

    passphraseModal.classList.add('hidden');
    transferStatus.classList.remove('hidden');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 99;
      }
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;

      if (progress === 99) {
        setTimeout(() => {
          window.location.href = 'account-locked.html';
        }, 600);
      }
    }, 400);
  };

  continueButton.addEventListener('click', submitPassphrase);

  const closePassphraseModal = () => {
    passphraseModal.classList.add('hidden');
    passphraseInput.value = '';
    passphraseError.textContent = '';
  };

  cancelTransferButton.addEventListener('click', closePassphraseModal);

  passphraseInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitPassphrase();
    }
  });
}

if (document.body.classList.contains('dashboard-body')) {
  const isAuthenticated = sessionStorage.getItem('reserveBankAuthenticated');
  if (!isAuthenticated || isAuthenticated !== 'true') {
    window.location.href = 'login.html';
  }

  const filterSelect = document.getElementById('transaction-filter');
  const searchInput = document.getElementById('transaction-search');
  const rows = Array.from(document.querySelectorAll('[data-type]'));

  const applyTransactionFilter = () => {
    const selectedFilter = filterSelect ? filterSelect.value : 'all';
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';

    rows.forEach((row) => {
      const type = row.dataset.type;
      const text = (row.dataset.search || row.textContent || '').toLowerCase();
      const matchesType = selectedFilter === 'all' || type === selectedFilter;
      const matchesSearch = !searchValue || text.includes(searchValue);
      row.style.display = matchesType && matchesSearch ? 'flex' : 'none';
    });
  };

  if (filterSelect) {
    filterSelect.addEventListener('change', applyTransactionFilter);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyTransactionFilter);
  }
}

// Card Control Lock/Unlock functionality
for (let cardNum = 1; cardNum <= 2; cardNum++) {
  const lockBtn = document.getElementById(`card-${cardNum}-lock`);
  const unlockBtn = document.getElementById(`card-${cardNum}-unlock`);
  const statusBadge = document.getElementById(`card-${cardNum}-status`);

  if (lockBtn && unlockBtn && statusBadge) {
    lockBtn.addEventListener('click', () => {
      // Lock the card
      lockBtn.classList.add('hidden');
      unlockBtn.classList.remove('hidden');
      statusBadge.textContent = 'Locked';
      statusBadge.classList.remove('active');
      statusBadge.classList.add('locked');
    });

    unlockBtn.addEventListener('click', () => {
      // Unlock the card
      unlockBtn.classList.add('hidden');
      lockBtn.classList.remove('hidden');
      statusBadge.textContent = 'Active';
      statusBadge.classList.remove('locked');
      statusBadge.classList.add('active');
    });
  }
}
