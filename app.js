const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const errorMsg = document.getElementById('error-msg');
const previewImg = document.getElementById('preview-img');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');

// Load saved image from localStorage
const savedImage = localStorage.getItem('uploadedImage');
if (savedImage) {
    previewImg.src = savedImage;
    previewImg.style.display = 'block';
}

browseBtn.addEventListener('click', () => fileInput.click());

// Prevent browser default behavior
['dragenter','dragover','dragleave','drop'].forEach(eventName => {
   dropArea.addEventListener(eventName, e => e.preventDefault());
});

// Highlight on drag
dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('hover');
});
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
});

// Handle drop
dropArea.addEventListener('drop', e => {
    dropArea.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    handleFile(file);
});

function handleFile(file) {
    errorMsg.textContent = "";
    
    if (!file || !file.type.startsWith("image/")) {
        errorMsg.textContent = "Please upload a valid image file (JPG, PNG, GIF).";
        return;
    }

    previewImage(file);
    simulateUpload();
}

function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        previewImg.style.display = "block";

        // Save to localStorage
        localStorage.setItem("uploadedImage", e.target.result);
    };
    reader.readAsDataURL(file);
}

function simulateUpload() {
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
}
