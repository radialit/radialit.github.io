(function iife() {
  var navItems;
  var scrollOffset;
  var tabItems;

  function siblings(ele) {
    return Array.prototype.filter.call(ele.parentNode.children, function(child) {
      return child !== ele;
    });
  }
  function removeClass(ele, className) {
    if (ele.classList)
      ele.classList.remove(className);
    else
      ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  function addClass(ele, className) {
    if (ele.classList)
      ele.classList.add(className);
    else
      ele.className += ' ' + className;
  }

  function getScrollOffset(querySelector) {
    var fixedEle = document.querySelector(querySelector);
    // subtract 1 to prevent showing a border
    return (fixedEle) ? (fixedEle.offsetHeight - 1) : 0;
  }
  function onNavClick(event) {
    var targetID = event.currentTarget.getAttribute('data-scrollto');
    if (!targetID) return;
    var targetEle = document.getElementById(targetID);
    if (!targetEle) return;
    Velocity(targetEle, 'scroll', { duration: 1000, axis: 'y', offset: -scrollOffset });
    event.preventDefault();
  }
  function onTabClick(event) {
    var targetID = event.currentTarget.getAttribute('data-transitionto');
    var targetEle;
    siblings(event.currentTarget).forEach(function(ele) {
      removeClass(ele, 'active');
    });
    addClass(event.currentTarget, 'active');
    if (!targetID) return;
    targetEle = document.getElementById(targetID);
    if (!targetEle) return;
    siblings(targetEle).forEach(function(ele) {
      removeClass(ele, 'active');
    });
    addClass(targetEle, 'active');
    event.preventDefault();
  }
  // offset due to fixed header
  scrollOffset = getScrollOffset('header');
  // listeners for nav clicks
  navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function (item) {
    item.addEventListener('click', onNavClick);
  });
  // listeners for tab clicks
  tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(function (item) {
    item.addEventListener('click', onTabClick, true);
  });
}());
