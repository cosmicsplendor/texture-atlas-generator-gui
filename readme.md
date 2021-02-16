# Texture Atlas Generator GUI
![App Screenhot](https://github.com/xtropia/texture-atlas-generator-gui/blob/master/src/images/screenShot.png)
This is a free web-based gui application for generating texture atlas. At this point, I cannot say that it can compete with professional tools like texture packer. However, the fact that it is free and opensource definitely makes it worth considering.

Over time, I will keep adding new features and improving UX.

In case you're curious, it uses React.js, and I believe this choice is self-explanatory. Currently, the app uses binary-tree strip packing algorithm, but I am open to adding other algorithms, particularly max-rects.

"start" npm script can be used to spin up a dev server:

```
npm start
```

# features
* Web based GUI
* 90 degrees rotation support
* customizable margin support
* Multiple rect sorting functions to choose from (optimal choice depends on the set of input sprites)
* Hitbox Editor
