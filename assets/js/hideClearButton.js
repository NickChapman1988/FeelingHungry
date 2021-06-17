//Seach button hide - taken from Stack Overflow answer by Josh Crozier//

Array.prototype.forEach.call(document.querySelectorAll('.clearable-input'), function(el) {
    var input = el.querySelector('input');
    console.log('input');
    conditionallyHideClearIcon();
    input.addEventListener('input', conditionallyHideClearIcon);
    el.querySelector('[data-clear-input]').addEventListener('click', function(e) {
      input.value = '';
      conditionallyHideClearIcon();
    });
  
    function conditionallyHideClearIcon(e) {
      var target = (e && e.target) || input;
      target.nextElementSibling.style.display = target.value ? 'block' : 'none';
    }
  });