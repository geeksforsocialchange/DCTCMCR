View it [here ](https://brave-wiles-0c8b95.netlify.app)

Based on [11ty Sass Skeleton](https://github.com/5t3ph/11ty-sass-skeleton)

# CMS gotchas

## Adding content

Content is organised into collections on the left

The `Homepage` is a collection of one and can't be expanded.

The `Pages` collection is any toplevel page that will get a menu item once created.

`Orgs` is all the different organisations which will populate the "who to call" page and generate use case directories from.

`Reasons` will populate the "why not call the cops" page.

**Pages with generated content**

Generated content is added based on the template option in the CMS. You shouldn't need to change this but just be aware if it sudenly disapears or apears on a page you weren't expecting that will be the reason.

Any text you add in the body formfield of the CMS will apear above this and can be used to introduce the purpose of the page or be left out if you feel it unhelpful.

## Org categories

**Adding org use cases**

In the tag section create a comma seperated list for the use cases or usergroup that you would like to display

**Copy and paste to add a tag with whitespace**

Trailing white space in the tags causes a failed build, to prevent this all whitespace that is not proceded by a comma is deleted making it impossible to type `mental health`.

**Trailing commas on the tag field will cause a failed build**

✔️ `trans, mental health`

❌️ `trans, mental health,`

## Links

**External links must include the protocol at the start**

✔️ `https://lgbt.foundation/domesticabuse` => `https://yoururl.com/img/example.jpg`

❌️ `www.lgbt.foundation/domesticabuse` => `https://yoururl.com/pages/who/https://yoururl.com/img/example.jpg`

**Internal links take 3 forms**

- start with a `/` and it will be releative to the root url

  `/img/example.jpg` => `https://yoururl.com/img/example.jpg`

- Without a `/` and it will be releative to the page url

  `img/example.jpg` => `https://yoururl.com/pages/who/img/example.jpg`

- start with the protocol and it will be used as is.

  `https://yoururl.com/img/example.jpg` => `https://yoururl.com/img/example.jpg`

## Images

Images can be uploaded via the media button near the top left and then included with markdown via their URL or added by hitting the `+` button in then rich text editor on a post.

Images will be displayed at the max width of the content area which is about 700px so try to avoid uploading images that are wider than this as it will take longer to load.
