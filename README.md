# vue-metatags-headful

Plugin for set meta tags. Vue-metatags-headful is a wrapper around [Vue-headful](https://github.com/troxler/vue-headful)

##### Features:
- setting h1
- setting title
- setting description
- setting keywords
- setting multilingualism using the library [vue-i18n](https://github.com/kazupon/vue-i18n)

## Installation

```sh
$ npm install @phoenix91/vue-metatags-headful --save
```

```js
import metaTags from '@/plugins/metaTags';
Vue.use(metaTags, {router: router, i18n: i18n}); // i18n optional parameter
```

After installation, `<vue-headful>` component, `Vue.prototype.$metaTags` or `this.$metaTags` object will become available for use

## Usage

Use the `metaTags` property in route's `meta`. The following properties can be specified in the `metaTags` object:
- h1
- title
- description
- keywords
- i18n_h1
- i18n_title
- i18n_description
- i18n_keywords

If you have a multilingual application, then you can also specify i18n_* aliases. I18n_* properties is a higher priority property than simple properties

If in meta tags you need to specify a parameter from the url address, then you can specify it directly in `metaTags` object

```js
new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        metaTags: {
          h1: 'Home',
          title: 'My home page',
          i18n_description: 'home_description',
          i18n_keywords: 'home_keywords',
        },
      },
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: {
        metaTags: {
          h1: 'Posts',
          title: 'My posts',
          i18n_description: 'posts_description',
          i18n_keywords: 'posts_keywords',
        },
      }
    },
    {
      path: '/posts/:post_id(\\d+)',
      name: 'post_view',
      component: PostView,
      meta: {
        metaTags: {
          h1: 'Post #:post_id',
          title: 'Post #:post_id',
          i18n_description: 'view_post_description', // where decryption of view_post_description is "Ddescription of view post #:post_id"
        }
      }
    },
  ],
});
```

If the value of any meta tag cannot be configured in the route, then it can be specified directly in the component using the `$metaTags` object. The following properties are available in the `$metaTags` object:
- h1
- title
- description
- keywords

Example of using a component in a template:

```html
<vue-headful
    :h1="$metaTags.h1"
    :title="$metaTags.title"
    :description="$metaTags.description"
    :keywords="$metaTags.keywords"
/>
```

Attention! The title meta tag is added automatically. The description and keywords meta tags must be explicitly (even if empty) written in the html template, otherwise they will not be filled. The H1 tag is set independently and `$metaTags.h1` must be explicitly passed to it:

```html
<h1>{{ $metaTags.h1 }}</h1>