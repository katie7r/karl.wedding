(function() {

  preparePage(); // rearrange elements where javascript is enabled

  var main     = document.getElementById('main');
  var navLinks = document.querySelectorAll('a.site');
  var headers  = document.querySelectorAll('#main header');
  var articles = document.querySelectorAll('#main article');

  // site links show and hide elements
  _.forEach(navLinks, function(link) {
    link.onclick = siteLinkOnclick;

    function siteLinkOnclick(e) {
      e.preventDefault();

      var target  = link.getAttribute('href');
      var header  = document.querySelector('header' + (target === '#home' ? '.home' : '.page'));
      var article = document.querySelector('article' + target);

      _.forEach(headers, function(h) { h.style.display = 'none'; });
      header.style.display = 'block';

      _.forEach(articles, function(a) { a.style.display = 'none'; });
      article.style.display = 'block';

      _.forEach(navLinks, function(n) { n.classList.remove('active'); });
      link.classList.add('active');

      // TODO recreate effect on #main (?) when 'page' changes,
      // because tony really wants that to happen

      // // main.removeAttribute('id');
      // document.body.classList.add('is-loading');
      //
      // // // main.style.animation = 'none';
      // // // main.style.transition = 'none';
      // main.style.opacity = 0;
      // // main.style.transform = 'rotate(15deg)';
      // main.style.webkitTransform = 'rotate(15deg)';
      //
      //
      // main.style.opacity = 0.95;
      // // main.style.transformOrigin = '50% 50%';
      // // main.style.transform = 'rotateX(0deg)';
      // main.style.webkitTransform = 'rotateX(0deg)';
      // // main.style.transition = 'opacity 1s ease, transform 1s ease';
      //
      // // var clone = main.cloneNode(true);
      // // clone.id = 'main';
      // // clone.classList.add('main');
      // // main.parentNode.replaceChild(clone, main);
      //
      // // main.id = 'main';
      // document.body.classList.remove('is-loading');
    }

  });

  function preparePage() {

    // hide all but home page header/body initially

    var headers  = document.querySelectorAll('#main header');
    var articles = document.querySelectorAll('#main article');

    _.forEach(headers, function(header) {
      if (header.className !== 'home') {
        header.style.display = 'none';
      }
    });

    _.forEach(articles, function(article) {
      if (article.id !== 'home') {
        article.style.display = 'none';
      }
    });

    // move footer to the bottom and page header to the top

    var main = document.getElementById('main');

    var mainHeader = document.querySelector('#main header.home');
    var pageHeader = document.querySelector('#main header.page');
    main.insertBefore(pageHeader, mainHeader);

    var footer   = document.querySelector('#main footer');
    main.appendChild(footer);

  }

})();
