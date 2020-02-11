/**
 * Lazy Loading (using IntersectionObserver)
 * for images, iframes and Ajax based content
 * Vasile Ciotu, support@oc-extensions.com
 */

;(function($) {
   $.fn.lazy = function(options) {
      var selector = this.selector;
      var options = $.extend({
         sourceAttribute: 'data-src',
         viewportMarginTop: 0,
         viewportMarginRight: 0,
         viewportMarginBottom: 200,
         viewportMarginLeft: 0,
         threshold: 0,
         live: true
      }, options);

      var observer_settings = {
         rootMargin: options.viewportMarginTop + 'px ' + options.viewportMarginRight + 'px ' + options.viewportMarginBottom + 'px ' + options.viewportMarginLeft + 'px',
         threshold: options.threshold
      };

      var observer = new IntersectionObserver(function(entries, observer) {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               load(entry.target);

               observer.unobserve(entry.target);
            }
         });
      }, observer_settings);

      // -----------------------------------------------------------------------------------------

      function init() {
         $(selector).not('.lazy-watching').not('.lazy-loading').not('.lazy-loaded').each(function(index, item) {
            add(item);
         });

         // or version without JQuery
         // document.querySelectorAll(selector).forEach(item => { add(item) });
      }

      function rebuild() {
         init();
      }

      function add(item) {
         observer.observe(item);

         setAsWatched(item);
      }

      function setAsWatched(item) {
         $(item).addClass('lazy-watching');
      }

      function load(item) {
         var source = $(item).attr(options.sourceAttribute);
         var type = $(item).prop('tagName');

         if (source) {
            if (type == 'IMG' || type == 'IFRAME') {
               $(item).attr('src', source);

               $(item).addClass('lazy-loaded');

            } else {
               $(item).addClass('lazy-loading');

               $(item).load(source, function() {
                  $(item).removeClass('lazy-loading').addClass('lazy-loaded');

                  if (options.live) {
                     rebuild();
                  }

                  $(document).trigger('lazycontentloaded');
               });


               // OR IF YOU WANT want DOM to look nice - without lazy placeholder after loading
               /*
			      $.get(source, function(html) {
                  $(item).removeClass('lazy-loading').addClass('lazy-loaded');

                  $(item).after(html);
                  $(item).remove();

                  if (options.live) {
                     rebuild();
                  }

                  $(document).trigger('lazycontentloaded');
               });
			      */
            }
         }
      }
      // -----------------------------------------
      init();
      return this;
   };

})(window.jQuery);
