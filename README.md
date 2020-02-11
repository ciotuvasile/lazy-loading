# lazy-loading
Lazy Loading plugin for images, iframes and ajax content based on IntersectionObserver

The script was born mostly becasue i wanted lazy loaded sections on oc-extensions.com and i didn't liked idea of using scrool + timer based scripts.

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
