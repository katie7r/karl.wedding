(function() {

  preparePage(); // rearrange elements where javascript is enabled

  var main     = $('#main');
  var navLinks = $('a.site');
  var headers  = $('#main header');
  var articles = $('#main article');

  var rsvpForm = $('#rsvp-form');

  // site links show and hide elements
  navLinks.on('click', siteLinkOnClick);

  // submit RSVP form via AJAX
  rsvpForm.on('submit', submitRSVP);

  function preparePage() {

    // hide all but home page header/body initially

    var headers  = $('#main header');
    var articles = $('#main article');

    headers.filter(':not(.home)').hide();
    articles.filter(':not(#home)').hide();

    // move footer to the bottom and page header to the top

    var main = $('#main');

    var mainHeader = $('#main header.home');
    var pageHeader = $('#main header.page');
    main.prepend(pageHeader, mainHeader);

    var footer = $('#main footer');
    main.append(footer);

  }

  function siteLinkOnClick(e) {
    e.preventDefault();

    var link    = $(this);
    var target  = link.attr('href');
    var header  = $('header' + (target === '#home' ? '.home' : '.page'));
    var article = $('article' + target);

    headers.hide();
    header.show();

    articles.hide();
    article.show();

    navLinks.removeClass('active');
    link.addClass('active');

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

  function submitRSVP(e) {
    e.preventDefault();

    var url   = rsvpForm.attr('action');
    var jqxhr = $.ajax({
      url:      url,
      method:   'GET', // Google sheet submit script requires GET
      dataType: 'json',
      data:     rsvpForm.serialize(),

    }).done(function(data) {
      console.log('Successfully saved form;', data);

      $('article#home').hide();
      $('article#thanks').show();

    }).fail(function(data) {
      console.log('Failed to save form;', data.error);

      var msg = $('<p class="error">An error occurred. Please try to submit the form again, or email Katie or Tony directly.</p>');
      rsvpForm.prepend(msg);
    });

  }

})();
