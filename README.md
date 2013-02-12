

# buster-qunit #

An adapter to enable running [QUnit](http://qunitjs.com) tests
from the [BusterJS](http://busterjs.org) JavaScript testing toolkit.

## Installation ##

Use the `npm` package manager to install this package.

    % sudo npm install -g buster-qunit

If you wish to install the development version instead of the latest
release, you can do the following from the same directory where this README 
resides:

    % sudo npm install -g .


## Usage ##

You will need to create a `buster.js` configuration file for
your QUnit tests. The `buster.js` file in the `examples`
folder serves as a template.

To set up a QUnit test suite, the extension has to be selected from
`buster.js`. You also have to specify the HTML file that runs the Qunit
tests, in the `html` attribute of the plugin configuration:

    config["the.example"] = {
        rootPath: "../",
        environment: "browser",
        extensions: [require('buster-qunit')],     // select extension
        'buster-qunit': {
            html: 'examples/test.html'             // specify your QUnit test
        }
    };

All the test and library sources will be mined out of the html you specify 
above. You do not need to specify the `sources`, `tests` or `libs` attributes,
as you would normally for a BusterJS test configuration - although if they are
specified, the referred sources will be included in addition to the ones
defined by the HTML.


## Roadmap ##

- loading resources from QUnit HTML (in progress)

- add async support (`start()`, `stop()`, `expect(n)`)


## Compatibility and restrictions ##

It is our goal to be able to run any pre-existing QUnit test transparently
from BusterJS, without any need to modify or prepare the QUnit tests.

Right now, in some cases, preparation is necessary to make QUnit tests 
compatible with this adapter. Once this is done, the tests can be maintained 
as a single source, and run in both QUnit and BusterJS.


### 1. JavaScript resource loading ###

QUnit tests are run from a browser by visiting an HTML page, and this HTML
contains `<script>` tags to load javascript. In BusterJS, there is no such
HTML. It is the task of `buster-qunit` to determine which resources are 
requested by the HTML, and marshall their loading to the test configuration.

There are some restrictions which may be elevated in later versions:

- Only local files with a path relative to this html can be loaded.
  Remote loading is currently not supported. Load your resources manually into
  a local folder, and use them from there, relatively from the test html
  location.

- Embedded script tags are currently not processed.

- CSS resources are not loaded. In the unlikely case that your test needed
  this, you could use the setup and teardown to load them as needed.

**THIS FEATURE IS IN PROGRESS!**


### 2. Async tests not supported ###

`start()`, `stop()` and `expect(n)` are not implemented. For most cases, you
can use the mock timers and ajax of [SinonJS](http://sinonjs.org) and avoid
the need for async tests. (This means that you have to rewrite your async tests
to sync, prior to running it with `buster-qunit`.)

### 3. Unsupported HTML problems ###

There can be cases when the HTML fails in BusterJS while it was working in
QUnit, due to different parsing. If you encounter such a case let us know,
so we can fix and document it.

#### 3.1 SCRIPT tags are filtered out ####

The SCRIPT tags will be filtered out from the HTML, an if your code makes use
of them, the tests will fail. For example the following will fail:

    <script type="text/tmpl" id="joined_left">
      <a href="{%= item.profile_url %}">{%= item.author %}</a>
        {%= item.operation %}
        Community <a href="{%= item.context_url %}">
          {%= item.context_name %}
        </a>.
    </script>

Other example that fails currently:

    <script type="text/x-handlebars" data-template-name="application">
        {{outlet}}
    </script>

This is a problem since various client templating systems use similar markup.
I am looking for a solution to this problem.
