# lazy-loading
Lazy Loading plugin for images, iframes and ajax content based on IntersectionObserver

The script was born mostly becasue i wanted lazy loaded sections on oc-extensions.com and i didn't liked idea of using scrool + timer based scripts.

Test it live on https://www.oc-extensions.com
Open Developer tool, scroll easy to the bottom and will see in console different ajax calls to:
https://www.oc-extensions.com/index.php?route=common/lazy/load with some params :)

# Usage
Add Jquery and Lazy script to your HTML:
```
<script src="path/to/jquery-x.y.z.min.js"></script>
<script src="path/to/lazy.min.js"></script>
```

Instantiate Lazy on elements with certain class (let's say ".lazy") like this:
```
$('.lazy').lazy();
```
OR with all options:
```
$('.lazy').lazy({
  sourceAttribute: 'data-src',
  viewportMarginTop: 0,
  viewportMarginRight: 0,
  viewportMarginBottom: 200,
  viewportMarginLeft: 0,
  threshold: 0,
  live: true
});
```

viewportMarginBottom: 200 => 200px before reaching element will start loading

# How should look your HTML?
# Images
```
<img class="lazy" src="placeholder-image.jpg" data-src="path/to/image/to/load.jpg" />
```

# IFrames
```
<iframe data-src="https://www.oc-extensions.com"></iframe>
```

# Ajax
```
<div class="lazy lazy-section" data-src="https://www.someurl.com/"></div>
```
If you're using lazy loaded sections in your website, make sure in css you use something like:
```
.lazy-section {
  min-height: 400px;  /* or value you want */
}

.lazy-section.lazy-loaded {
  min-height: auto;
}
```
Why? If no default height is specified and let's say you have multiple lazy sections (one below other) then all sections are loaded when in viewport is visible first one. (all other will have same offset).
I'm sure you get it. Right?

Tip: If you want search engines to access your content then make sure lazy loading is not used when they access your website.
If you check oc-extensions.com and using developer tools, you set User-Agent as 'something containing googlebot work' will see content is available directly in source.

# Callbacks
# lazycontentloaded

The lazyloaded content event is triggered after AJAX content is loaded (NOT available for images or iframes) in case you need to do some other operations :)
```
$(document).on('lazycontentloaded', function(event) {
// do something
});
```

# Questions?
For any questions: support@oc-extensions.com
