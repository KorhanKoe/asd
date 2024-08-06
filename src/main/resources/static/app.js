let slideInterval; // Globale Variable für das Intervall der Slideshow
let slideIndex = 0; // Index für die automatische Slideshow
let isAutoSlideActive = true; // Flag, ob die automatische Slideshow aktiv ist

document.addEventListener('DOMContentLoaded', function () {
    const infoblocksDiv = document.getElementById('infoblocks');
    const createForm = document.getElementById('create-form');

    // Funktion, um alle InfoBlocks zu laden
    function loadInfoBlocks() {
        fetch('/api/infoblock')
            .then(response => response.json())
            .then(data => {
                infoblocksDiv.innerHTML = '';
                data.forEach(infoBlock => {
                    const div = document.createElement('div');
                    div.className = 'infoblock';
                    div.innerHTML = `
                        <h3>${infoBlock.title}</h3>
                        <p>${infoBlock.content}</p>
                        <button class="delete-button" onclick="deleteInfoBlock(${infoBlock.id})">Löschen</button>
                    `;
                    infoblocksDiv.appendChild(div);
                });
            });
    }

    // Funktion, um einen InfoBlock zu löschen
    window.deleteInfoBlock = function (id) {
        fetch(`/api/infoblock/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    loadInfoBlocks();
                }
            });
    };

    // Event-Listener zum Erstellen eines neuen InfoBlocks
    createForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        fetch('/api/infoblock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            loadInfoBlocks();
        });
    });

    // Initiale Ladefunktion für InfoBlocks
    loadInfoBlocks();

    // Funktion zur Anpassung der Geschwindigkeit des Sliders
    function adjustSlideInterval() {
        let interval = 3000; // Standardgeschwindigkeit (3 Sekunden)
        
        if (window.innerWidth <= 510) {
            interval = 5000; // Langsame Geschwindigkeit für kleine Bildschirme (5 Sekunden)
        } else if (window.innerWidth <= 850) {
            interval = 4000; // Mittlere Geschwindigkeit für mittelgroße Bildschirme (4 Sekunden)
        }
        
        // Lösche den aktuellen Intervall, wenn vorhanden
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Starte den neuen Intervall mit der angepassten Geschwindigkeit
        if (isAutoSlideActive) {
            slideInterval = setInterval(showSlides, interval);
        }
    }

    // Funktion zum Anzeigen der Slides
    function showSlides() {
        let slides = document.getElementsByClassName("placeholder-slide");
        if (slides.length === 0) return; // Falls keine Slides vorhanden sind, nichts tun

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "flex";
    }

    // Event-Listener für die Slider-Pfeile
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const placeholders = document.querySelectorAll('.placeholder');
    const totalPlaceholders = placeholders.length;
    let visibleCount = window.innerWidth <= 510 ? 1 : 3; // Anzahl der gleichzeitig sichtbaren Platzhalter

    let currentIndex = 0;

    function updateSlider() {
        const offset = -((100 / visibleCount) * currentIndex);
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    document.getElementById('arrow-rht').addEventListener('click', function () {
        if (isAutoSlideActive) {
            clearInterval(slideInterval);
            isAutoSlideActive = false;
        }
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalPlaceholders - visibleCount;
        updateSlider();
    });

    document.getElementById('arrow-lft').addEventListener('click', function () {
        if (isAutoSlideActive) {
            clearInterval(slideInterval);
            isAutoSlideActive = false;
        }
        currentIndex = (currentIndex < totalPlaceholders - visibleCount) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Initiale Anpassung der Geschwindigkeit und sichtbaren Platzhalter
    adjustSlideInterval();

    // Event-Listener für Fenstergröße, um die Geschwindigkeit und sichtbare Platzhalter anzupassen
    window.addEventListener('resize', function() {
        visibleCount = window.innerWidth <= 510 ? 1 : 3;
        updateSlider();
        adjustSlideInterval();
    });

    // Optional: Automatische Wiederaufnahme der Slideshow nach einer gewissen Zeit der Inaktivität
    function resetAutoSlide() {
        if (isAutoSlideActive) return; // Wenn die automatische Slideshow bereits aktiv ist, nichts tun
        isAutoSlideActive = true;
        adjustSlideInterval();
    }

    // Event-Listener für manuelle Navigation zur Rücksetzung der Slideshow
    document.getElementById('arrow-rht').addEventListener('click', resetAutoSlide);
    document.getElementById('arrow-lft').addEventListener('click', resetAutoSlide);
});


window.addEventListener('resize', centerSlider);
window.addEventListener('load', centerSlider);


// Funktion zum Umschalten von Textinhalten
function toggleText(index) {
    const placeholders = document.getElementsByClassName('placeholder');
    const textContainer = placeholders[index].querySelector('.text-container');
    if (textContainer.style.maxHeight) {
        textContainer.style.maxHeight = null;
    } else {
        textContainer.style.maxHeight = textContainer.scrollHeight + "px";
    }
}

// Funktion zum Anzeigen von InfoBoxen in einem Modal
function showInfo(index) {
    const infoData = [
        { title: "InfoBox 1", content: "Details about InfoBox 1" },
        { title: "InfoBox 2", content: "Details about InfoBox 2" },
    ];

    const info = infoData[index];

    document.getElementById('modal-title').innerText = info.title;
    document.getElementById('modal-content').innerText = info.content;
    
    document.getElementById('info-modal').style.display = "block";
}

// Funktion zum Schließen des Modals
function closeModal() {
    document.getElementById('info-modal').style.display = "none";
}
