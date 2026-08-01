(() => {
  const form = document.getElementById('estimateForm');
  if (!form) return;

  const servicesFieldset = document.getElementById('servicesFieldset');
  const serviceInputs = [...form.querySelectorAll('input[name="Services Needed[]"]')];
  const servicesError = document.getElementById('servicesError');
  const otherService = document.getElementById('otherService');
  const otherField = document.getElementById('otherServiceField');
  const otherDescription = document.getElementById('otherServiceDescription');
  const photoFields = [...document.querySelectorAll('.photo-field')];
  const photoInputs = [...form.querySelectorAll('input[type="file"]')];
  const addPhoto = document.getElementById('addPhoto');
  const photoError = document.getElementById('photoError');
  const status = document.getElementById('formStatus');

  const allowedExtensions = new Set(['jpg', 'jpeg', 'png', 'heic', 'webp']);
  const maxCombinedBytes = 7.5 * 1024 * 1024;

  function cleanText(value, preserveLines = false) {
    const withoutControls = value.replace(
      preserveLines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g,
      ''
    );
    return withoutControls.replaceAll('<', '‹').replaceAll('>', '›').trim();
  }

  function sanitizeInputs() {
    form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea').forEach(input => {
      input.value = cleanText(input.value, input.tagName === 'TEXTAREA');
    });
  }

  function updateOtherField() {
    const selected = otherService.checked;
    otherField.hidden = !selected;
    otherDescription.required = selected;
    if (!selected) {
      otherDescription.value = '';
      otherDescription.setCustomValidity('');
    }
  }

  function validateServices() {
    const valid = serviceInputs.some(input => input.checked);
    servicesError.textContent = valid ? '' : 'Please select at least one service.';
    servicesFieldset.classList.toggle('has-error', !valid);
    return valid;
  }

  function selectedFiles() {
    return photoInputs.flatMap(input => [...input.files]);
  }

  function validatePhotos() {
    const files = selectedFiles();
    let message = '';

    if (files.length > 10) {
      message = 'Please upload no more than 10 images.';
    } else {
      const invalid = files.find(file => {
        const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
        return !allowedExtensions.has(extension);
      });
      if (invalid) {
        message = `${invalid.name} is not an accepted image format.`;
      } else if (files.reduce((total, file) => total + file.size, 0) > maxCombinedBytes) {
        message = 'The combined photo upload must be under 8 MB.';
      }
    }

    photoError.textContent = message;
    photoInputs.forEach(input => input.setCustomValidity(message));
    return !message;
  }

  function revealNextPhotoField() {
    const next = photoFields.find(field => field.hidden);
    if (next) {
      next.hidden = false;
      next.querySelector('input').focus();
    }
    addPhoto.hidden = !photoFields.some(field => field.hidden);
  }

  function showStatus(type, message) {
    status.className = `form-status ${type}`;
    status.textContent = message;
    status.focus();
  }

  otherService.addEventListener('change', updateOtherField);
  serviceInputs.forEach(input => input.addEventListener('change', validateServices));
  photoInputs.forEach(input => input.addEventListener('change', validatePhotos));
  addPhoto.addEventListener('click', revealNextPhotoField);
  updateOtherField();

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    sanitizeInputs();

    const servicesValid = validateServices();
    const photosValid = validatePhotos();
    const formValid = form.checkValidity();

    if (!servicesValid || !photosValid || !formValid) {
      form.reportValidity();
      if (!servicesValid) serviceInputs[0].focus();
      showStatus('error', 'Please review the highlighted fields and complete all required information.');
      return;
    }

    showStatus(
      'error',
      'Online estimate requests are temporarily unavailable. Please email thomas@scapeliftpm.com for assistance.'
    );
  });
})();
