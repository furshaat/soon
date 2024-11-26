function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

async function submitForm(event, formId) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(event.target);
        
        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Clear form and close modal
            event.target.reset();
            closeModal(formId);
            
            // Navigate to thank you page
            window.location.href = 'thanks.html';
        } else {
            throw new Error(data.message || 'Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}