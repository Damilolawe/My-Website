/* AWE / DIGITAL inquiry form — Netlify Forms requires URL-encoded submissions. */
const form = document.querySelector('form[name="awe-inquiries"]');
if (form) {
  const status = document.querySelector('#inquiry-status');
  const button = form.querySelector('button[type="submit"]');
  let submitting = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    submitting = true;
    button.disabled = true;
    button.textContent = 'SENDING YOUR INQUIRY…';
    status.textContent = 'Submitting securely…';
    status.dataset.state = 'pending';
    try {
      const response = await fetch('/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'text/html'
        },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) {
        throw new Error('Netlify could not accept this submission (HTTP ' + response.status + ').');
      }
      form.reset();
      form.hidden = true;
      const success = document.querySelector('#inquiry-success');
      success.hidden = false;
      success.focus();
      status.textContent = '';
      status.dataset.state = 'success';
    } catch (error) {
      status.textContent = error.message + ' Please try again, or contact the studio through another channel.';
      status.dataset.state = 'error';
      button.textContent = 'TRY SENDING AGAIN ↗';
    } finally {
      submitting = false;
      button.disabled = false;
    }
  });
}
