# aEsto - minimalist Blog & Magazin theme for Ghost

---

A simple lightwight free theme for your Ghost publication with ghost membership feature.

![Aesto Preview](https://res.cloudinary.com/inoryum/image/upload/v1597863113/ghost-documents/git_preview_e3wgxr.jpg)

[Demo](https://aesto.inoryum.com) - [Documantation](https://inoryum.com/docs/aesto) 

---

# Theme features

*   Clean & responsive design
*   Lightweight
*   Enhanced performance
*   Responsive images
*   Lazy Loading for images
*   SVG icons are used
*   Well structured & commented codes
*   Highly to customize
*   Instant Search
*   Disqus comments integrated
*   Custom Template for Tags & Authors pages
*   Social share support for posts
*   Responsive videos
*   Developer friendly

* * *

# Ghost core features

*   Membership support  
    - Signin page  
    - Signup page  
    - Account page  
    - Pricing page  
    - Notifications  
    - Call to action for subscription in members, paid-members only post.  
    - Post visibility depending on access
*   Translation ready  
    - English & Spanish included.
*   Publication title & description
*   Publication icon & Logo
*   Custom excerpt support
*   Primary & secondary Navigation  
    - Primary navigation on header  
    - Secondary navigation on footer
*   Subscriber form
*   Feature Icon for Featured post
*   Social links & icons
*   Tag archive
*   Author archive
*   Read time
*   Multiple author support for post
*   Koenig Editor  
    - Gallery and Bookmark and all other inbuilt card in Koenig editor
*   Responsive YouTube, Vimeo, SoundCloud, Spotify, twitter, Instagram and all other embed
*   Previous and next post link in single post view

* * *

## Credits

*   Images by [Unsplash](https://unsplash.com/)
*   [jQuery](https://jquery.com/)
*   Search Engine by [SearchinGhostEasy](https://github.com/gmfmi/searchinghost-easy)
*   [FitVids](http://fitvidsjs.com/)

* * *


# Development

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# Install
yarn

# Run build & watch for changes
$ yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
yarn zip
```

---

# Copyright & License

Copyright (c) 2020 Ghost Inoryum Ltd - Released under the [MIT license](LICENSE).
