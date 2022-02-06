# Emoji Picker

Try it now at [emoji.dwac.dev](https://emoji.dwac.dev/)!

![Screenshot of the emoji picker, showing a large grid of various emoji icons and
including a text box labeled "Emoji filter" with an popup message which reads "Copied 😀
to clipboard!"](/docs/screenshot.png)

A simple emoji picker
[Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction)
with search functionality to easily find and copy your favorite ♥️ emojis! Use the search
box 🔍 to filter for the emoji you are looking for, and click on it to easily copy to the
clipboard 📋. Consider installing the application on your device (or add to home screen)
for additional emoji goodness 🤗!

# Local Development

Install the development environment with:

```shell
$ npm ci
```

Run the application locally with:

```shell
$ npm start
# Open your browser to http://localhost:4200/
```

# Testing

Run tests with:

```
$ npm test
```

Though I got pretty lazy with tests here, so TBH there's not much there.

# Deployments

Deploy with:

```shell
$ npm run -s deploy -- --site "${SITE_ID}" --prod
```
