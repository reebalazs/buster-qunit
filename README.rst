
============
buster-qunit
============

An adapter to enable running QUnit tests from buster.js.

Installation
============

Installable now from git. You must have ``buster.js`` already installed.

If you have this package checked out to somewhere, then instead of just requiring the package by its name, you
need to reference the ``lib/extension.js`` file of this package with its relative path from your ``buster.js``
configuration, like: ``extensions: [require('../lib/extension.js')]`` - where the path should be adapted to
your location. Also see: ``example/buster.js`` example configuration.

When released later: installable with the ``npm`` package manager, and usable like ``extensions:
[require('buster-qunit')]`` from ``buster.js``.


Compatibility
=============

A desirable goal would be to enable us to run any existing QUnit test transparently from ``buster.js``, without
any need to modify the QUnit tests.

Right now, a few manual conversion steps have to be done to have QUnit tests running with this adapter.
Following this, the tests can be maintained in a way that they remain runnable in parallel as a QUnit
test, and from ``buster.js`` as well.


1. Defining which javascript to load
------------------------------------

QUnit tests are run from a browser by visiting an HTML page, and this HTML contains ``<script>`` tags to load
javascript. In buster, there is no such HTML, so the existing QUnit templates are of no use and currently
not convertible to buster. The scripts have to be once manually defined from the ``buster.js``
configuration file, as described in details by the buster documentation.

(It would be possible to make a conversion tool for this step and the next one as well.)


2. HTML markup for tests
------------------------

In QUnit, there is a ``<div id="main" />`` tag in the template, which is acting as the testing sandbox. Its
content stands at every test's disposition before they set up, and is guaranteed to clean up
after they tear down.  In ``buster.js``, there is no such HTML, so the content of ``#main`` must be built up by
javascript, from the setup method of the test module.

The tests can assume however that ``#main`` exists and is empty, before any test runs.


Missing
=======

1. Async not supported
----------------------

``start()``, ``stop()`` and ``expect(n)`` are not implemented. For most cases, you can use sinon.js's mock
timers for the purpose and avoid writing async tests, or, convert your async tests to such tests.


2. Asserts
----------

Some QUnit asserts may be missing. We add them as we discover this.


