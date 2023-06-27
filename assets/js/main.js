// Get reference to the #hero element
const hero = document.getElementById('hero');

// Define an array of background videos or images
const backgrounds = [
  { type: 'video', source: './assets/video/video1.mp4'},
  { type: 'video', source: './assets/video/video2.mp4'},
  { type: 'video', source: './assets/video/video3.mp4'},
  { type: 'video', source: './assets/video/video4.mp4'},
  { type: 'video', source: './assets/video/video5.mp4'},
  { type: 'video', source: './assets/video/video6.mp4'},
  { type: 'video', source: './assets/video/video7.mp4'},
  { type: 'video', source: './assets/video/video8.mp4'},
  { type: 'video', source: './assets/video/video9.mp4'},
  { type: 'video', source: './assets/video/video10.mp4'},
  { type: 'image', source: './assets/img/background_image/img1.jpg'},
  { type: 'image', source: './assets/img/background_image/img2.jpg'},
  { type: 'image', source: './assets/img/background_image/img3.jpg'},
  { type: 'image', source: './assets/img/background_image/img4.jpg'},
  { type: 'image', source: './assets/img/background_image/img5.jpg'},
  { type: 'image', source: './assets/img/background_image/img6.jpg'},
  // Add more backgrounds as needed
];

// Get references to HTML elements
const backgroundBtn = document.getElementById('background-btn');
const videoElement = document.getElementById('background-video');
const videoSourceElement = document.getElementById('video-source');
const heroVideo = document.querySelector('#hero video');
var isMobile = window.matchMedia("(max-width: 768px)").matches;

// Attach click event listener to the button
backgroundBtn.addEventListener('click', changeBackground);

// Call the changeBackground() function on load to get a random background on each load. 
document.addEventListener('DOMContentLoaded', function() {
  changeBackground();
});

// Function to change the background randomly
function changeBackground() {
  // Randomly select a background from the array
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  // Change the background based on the type
  if (randomBackground.type === 'video') {
    // Change z-index to make video visible
    // heroVideo.style.zIndex = '0';
    hero.style.background = 'none'; // Clear any previous background image
    const newVideoSource = randomBackground.source; // Specify the path to the new video
  
    // Update the src attribute of the video source element
    videoSourceElement.src = newVideoSource;
    
    // Load the new video source
    heroVideo.style.transition = 'all 1s ease-in';
    videoElement.load();
    // Fade out the previous background

    


  } else if (randomBackground.type === 'image') {
    // Reset the src attribute of the video source element
    videoSourceElement.src = '';

    // Load the empty source to unload the video
    videoElement.load();
    // Change the z-index to hide the video
    // heroVideo.style.zIndex = '-1';

    // After the previous background fades out, change the background and fade it in
    
    hero.style.transition = 'all 1s ease-in';
    hero.style.background = `url(${randomBackground.source}) top right no-repeat`;
    hero.style.width = `100%`;
    hero.style.height = `100vh`;
    hero.style.position = `relative`;
    hero.style.backgroundSize = 'cover';

    // Change the background and style for the img6
    var backgroundImage6 = "./assets/img/background_image/img6.jpg";
    if (isMobile && randomBackground.source === backgroundImage6) {
      hero.style.backgroundPosition = "left top";
    };
  }
}

/* Read More buttons for the job description: */
// City of PCB Read more button
var PCBJobReadMoreBtn = document.getElementById("pcbread-more-btn");
var PCBJobFullText = document.getElementById("pcbreadmore");

PCBJobReadMoreBtn.addEventListener("click", function(){
  readMoreFunc(PCBJobFullText, PCBJobReadMoreBtn)
});

// Osceola County Read more button
var OsceolaJobReadMoreBtn = document.getElementById("osceolaread-more-btn");
var OsceolaJobFullText = document.getElementById("osceolareadmore");

OsceolaJobReadMoreBtn.addEventListener("click", function(){
  readMoreFunc(OsceolaJobFullText, OsceolaJobReadMoreBtn)
});

function readMoreFunc(fullText, readMoreBtn) {
  if (fullText.style.display === 'none') {
    fullText.style.display = 'block';
    readMoreBtn.textContent = 'Read Less';
  } else {
    fullText.style.display = 'none';
    readMoreBtn.textContent = 'Read More';
  }
};


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }



  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  const backgroundBtn = document.getElementById('background-btn');

// Function to handle scroll event
function handleScroll() {
  if (window.scrollY > 0) {
    backgroundBtn.style.opacity = '0';
  } else {
    backgroundBtn.style.opacity = '1';
  }
}

// Attach scroll event listener to the window
window.addEventListener('scroll', handleScroll);


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()