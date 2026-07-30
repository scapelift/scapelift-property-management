(() => {
  const form = document.getElementById('estimateForm');
  if (!form) return;

  const fullName = document.getElementById('fullName');
  const subject = document.getElementById('emailSubject');
  const submittedAt = document.getElementById('submittedAt');
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
  const submitButton = document.getElementById('submitEstimate');
  const status = document.getElementById('formStatus');
  const startedAt = Date.now();

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

  function resetDynamicFields() {
    photoFields.forEach((field, index) => {
      field.hidden = index !== 0;
    });
    addPhoto.hidden = false;
    photoError.textContent = '';
    servicesError.textContent = '';
    updateOtherField();
  }

  otherService.addEventListener('change', updateOtherField);
  serviceInputs.forEach(input => input.addEventListener('change', validateServices));
  photoInputs.forEach(input => input.addEventListener('change', validatePhotos));
  addPhoto.addEventListener('click', revealNextPhotoField);
  updateOtherField();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    sanitizeInputs();

    subject.value = `New Estimate Request - ${cleanText(fullName.value) || 'Customer'}`;
    submittedAt.value = new Date().toISOString();

    const servicesValid = validateServices();
    const photosValid = validatePhotos();
    const formValid = form.checkValidity();

    if (!servicesValid || !photosValid || !formValid) {
      form.reportValidity();
      if (!servicesValid) serviceInputs[0].focus();
      showStatus('error', 'Please review the highlighted fields and complete all required information.');
      return;
    }

    if (Date.now() - startedAt < 2500) {
      showStatus('error', 'Please take a moment to review your information before submitting.');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending Request…';

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: new FormData(form)
      });
      if (!response.ok) throw new Error(`Submission failed with status ${response.status}`);

      form.reset();
      resetDynamicFields();
      showStatus('success', 'Thank you! Your estimate request was received. ScapeLift will contact you shortly.');
    } catch (error) {
      console.error('Estimate request submission failed:', error);
      showStatus('error', 'We could not send your request right now. Please try again, or email thomas@scapeliftpm.com.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Request My Free Estimate';
    }
  });
})();
