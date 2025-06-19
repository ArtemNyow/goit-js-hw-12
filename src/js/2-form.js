const form = document.querySelector('.feedback-form');
const STOREGE_KEY = 'feedback-form-state'
let formData = { email: "", message: "",};

const saved = localStorage.getItem(STOREGE_KEY);
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        formData = { ...formData, ...parsed };
        form.elements.email.value = formData.email || '';
        form.elements.message.value = formData.message || '';
    } catch (e) {
        console.error('Invalid data in localStorage')
    }
}

form.addEventListener('input', event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STOREGE_KEY, JSON.stringify(formData));
});


form.addEventListener('submit', event => {
    event.preventDefault();
    const { email, message } = formData;
    if (!email || !message) {
        alert('Fill please all fields')
        return;
    }
    console.log(formData);
    localStorage.removeItem(STOREGE_KEY);
    form.reset();
    formData = { email: "", message: "",};
    
})
