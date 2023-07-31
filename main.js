// Function to handle the click on the language dropdown
document.querySelector('.header-right .language-dropdown').addEventListener('click', function(event) {
    this.classList.toggle('active');
    event.stopPropagation();
});

document.addEventListener('click', function() {
    var dropdown = document.querySelector('.header-right .language-dropdown');
    dropdown.classList.remove('active');
});

function handleScrollClick(event) {
    event.preventDefault();
    isButtonScroll = true; // Set the flag for button-initiated scrolling
  
    var targetId = this.getAttribute('data-target');
    var target = document.querySelector(targetId);
  
    // Get the height of the header
    var headerHeight = document.querySelector('.header').offsetHeight;
  
    // Calculate the scroll position, adjusting for the header's height
    var offset = (targetId !== '#footer') ? headerHeight : 0;
    var position = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
    // Scroll to the calculated position
    window.scrollTo({
        top: position,
        behavior: 'smooth'
    });
  
    // Reset the flag after the scroll is complete
    setTimeout(function() {
      isButtonScroll = false;
    }, 500);
  }
  
  // Attach the scroll event to all links with data-target attribute
  document.querySelectorAll('a[data-target]').forEach(function(btn) {
    btn.addEventListener('click', handleScrollClick);
  });

var lastScrollTop = 0;
var isButtonScroll = false;

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (isButtonScroll) {
      document.querySelector('.header').classList.remove('header-hidden');
    } else {
      if (scrollTop > lastScrollTop) {
        // If scrolling down manually, hide the header
        document.querySelector('.header').classList.add('header-hidden');
      } else {
        // If scrolling up, show the header
        document.querySelector('.header').classList.remove('header-hidden');
      }
    }
    
    lastScrollTop = scrollTop;
  });

document.querySelector('.language-dropdown .language-link').addEventListener('click', function(event) {
    event.preventDefault();
    this.parentElement.classList.toggle('active');
    event.stopPropagation();
});

function replaceWordsInTextNodes() {
    var wordsToReplace = ['Java', 'Javascript', 'Angular', 'React', 'Python', 'ML algorithms', 'ML-Algorithmen', 'HTML', 'CSS', 'SQL', 'Hibernate', 'JavaScript', 'University of Bremen', 'computer science', 'Git'];
    var regExp = new RegExp('\\b(' + wordsToReplace.join('|') + ')\\b', 'g');

    function replaceWordsInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            var replacedText = node.nodeValue.replace(regExp, '<strong style="font-size: inherit;">$1</strong>');
            var div = document.createElement('div');
            div.innerHTML = replacedText;

            var parent = node.parentNode;
            while (div.firstChild) {
                parent.insertBefore(div.firstChild, node);
            }

            parent.removeChild(node);
        } else {
            node.childNodes.forEach(replaceWordsInNode);
        }
    }

    // Target specific elements or the entire body
    replaceWordsInNode(document.body);
}

// Call the function to perform the replacements
replaceWordsInTextNodes();
