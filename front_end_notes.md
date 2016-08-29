```bash
npm i --save-dev \
  babel-core `#this.. is babel` \
  babel-loader `#since npm3, all peer deps need to be stated; this is for loaders` \
  babel-plugin-transform-class-properties `#allow for ES6 class syntax` \
  babel-plugin-transform-react-jsx `#Compile JSX -> js` \
  babel-preset-es2015 `#use all the presets for ES6` \
  babel-preset-es2015-loose `#not sure if we need this one, allows for loose mode?` \
  babel-preset-stage-0 `#enable all the features basically, check babel stages` \
  css-loader `#enable the @import for css stuff` \
  extract-text-webpack-plugin `#moves all CSS into a style.css file instead of inlining` \
  webpack `#I'm still figuring this one out'` \
  webpack-dev-server `#Going to try not to use this, should be able to compile and serve through express`
```