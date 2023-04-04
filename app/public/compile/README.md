# jsxをjsにする
srcフォルダを作成し、配下にjsxファイルを置く。
npx babel --watch src --out-dir . --presets react-app/prod


# コンパイルコマンド
URL:https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3

In production, it is recommended to minify any JavaScript code that is included with your application. Minification can help your website load several times faster, especially as the size of your JavaScript source code grows.

Here's one way to set it up:

Install Node.js
Run npm init -y in your project folder (don't skip this step!)
Run npm install terser
Now, to minify a file called like_button.js, run in the terminal:
```
npx terser -c -m -o like_button.min.js -- like_button.js
```
This will produce a file called like_button.min.js with the minified code in the same directory. If you're typing this often, you can create an npm script to give this command a name.
