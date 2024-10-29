let overlayVisible = false; 

function createRipple(x, y) {
    const ripple = $('<div class="ripple"></div>');
    $('body').append(ripple);
    ripple.css({
        left: x,
        top: y
    });
    setTimeout(() => {
        ripple.remove(); 
    }, 600);
}

function showOverlay() {
    const overlay = $('.overlay');

    if (!overlayVisible) { 
        overlay.removeClass('hidden'); 
        overlayVisible = true; 

        gsap.fromTo(overlay, {
            scale: 0, 
            opacity: 0 
        }, {
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: "back.out(1.7)", 
            onComplete: function () {
                console.log("Overlay shown!");

                
                overlay.on('click', function (e) {
                    createRipple(e.pageX, e.pageY);

                    gsap.to(overlay, {
                        scale: 0,
                        opacity: 0,
                        duration: 1,
                        ease: "back.in(1.7)",
                        onComplete: function () {
                            overlay.addClass('hidden'); 
                            overlayVisible = false; 
                            startLampsAnimation();
                        }
                    });
                });
            }
        });
    }
}

showOverlay();
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


overlay.on('click', debounce(function (e) {
    createRipple(e.pageX, e.pageY);
    
}, 300)); 


function startLampsAnimation() {
    const lampCount = 10; 
    const lamps = [];
    const angleIncrement = (2 * Math.PI) / lampCount;

    
    for (let i = 0; i < lampCount; i++) {
        const lamp = $('<img class="lamp" src="lamp2.png" alt="Diwali Lamp">'); 
        const angle = i * angleIncrement;
        const x = Math.cos(angle) * 150; 
        const y = Math.sin(angle) * 150;

        
        lamp.css({
            transform: `translate(${x}px, ${y}px)`,
            width: '150px',
            height: 'auto', 
            padding: '10px', 
            margin: '40px',
            boxSizing: 'border-box' 
        });

        $('.lamp-container').append(lamp);
        lamps.push(lamp);
    }
    const centerLamp = $('<img class="lamp center-lamp" src="lamp2.png" alt="Central Diwali Lamp">');
    centerLamp.css({
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '180px', 
        height: 'auto',
        zIndex: 1 
    });
    
    $('.lamp-container').append(centerLamp);
    lamps.push(centerLamp); 

    gsap.to(lamps, {
        duration: 1,
        opacity: 1,
        stagger: 0.2,
        onComplete: function () {
            console.log("Lamps Loaded!");

            
            gsap.to('.lamp-container', {
                duration: 1,
                opacity: 0,
                onComplete: function () {
                    
                    $('.big-lamp-container').fadeIn(1000);
                    gsap.from('.big-lamp', { duration: 1, scale: 0, ease: "bounce.in" });
                    gsap.from('.message h2', { duration: 1, opacity: 0, y: 20, delay: 0.5 });

                    
                    gsap.delayedCall(1.5, function () {
                        startTypewriterWithSound();
                    });
                }
            });
        }
    });

    gsap.registerPlugin(TextPlugin);
    gsap.fromTo(
        ".message h2 span",
        { scale: 0, rotation: -180, opacity: 0 }, 
        {
            scale: 1.5,
            rotation: 0,
            opacity: 1,
            duration: 5, 
            ease: "expo.out",
            stagger: 0.5,             
        }
    );

    const messageElement = document.querySelector('.message h2');
        
    messageElement.addEventListener('click', function(event) {
        console.log("Message clicked!"); 
        event.preventDefault();
        event.stopPropagation();
        
    });



        gsap.registerPlugin(TextPlugin);
    
        
        const typeSound = new Audio('type.mp3'); 
        typeSound.preload = "auto"; 
        typeSound.loop = false; 
        let soundPlayed = false; 
        var userInteraction = true; 
    
        $(document).on('click', function () {
            userInteraction = true; 
            console.log("User interacted with the page");
        });
    
        
        function startTypewriterWithSound() {
            const message = "அன்பின் ஒளியால் இனிமை பூக்கும் தீபத்திருக்கின்றன்று, ஒவ்வொரு நொடியும் மகிழ்ச்சி பொங்கச் செய்யும் நம் வாழ்வில் மகத்தான அருள்வழி – இனிய தீபாவளி நல்வாழ்த்துகள்!";
            const words = message.split(" "); 
    
            let delay = 0; 
            const container = $(".typewrite-text"); 
    
            words.forEach((word, index) => {
                
                const wordSpan = $('<span class="word"></span>').text(word + " ");
    
                
                container.append(wordSpan);
    
                
                const wordDelay = delay + index * 0.5; 
    
                gsap.fromTo(wordSpan, {
                    scale: 0,
                    opacity: 0,
                }, {
                    scale: 1.5,
                    opacity: 1,
                    duration: 0.5, 
                    ease: "power3.inOut",
                    delay: wordDelay,
                    onStart: function () {
                        // Play sound only if user has interacted and sound hasn't been played yet
                        if (userInteraction && !soundPlayed) { 
                            typeSound.currentTime = 0; 
                            console.log("Playing sound"); 
                            typeSound.play().catch((error) => {
                                console.error("Error playing sound:", error);
                            });
                            soundPlayed = true; 
                        }
                    }
                    
                });
            });
        }

      
}
