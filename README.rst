
============
buster-qunit
============

An adapter to enable running QUnit tests from buster.js.

Installation
============

Installable now from git. You must have ``buster.js`` already
installed.

If you have this package checked out to somewhere, then instead
of just requiring the package by its name, you need to reference
the ``lib/extension.js`` file of this package with its relative
path from your ``buster.js`` configuration, like: ``extensions:
[require('../lib/extension.js')]`` - where the path should be
adapted to your location. Also see: ``example/buster.js`` example
configuration.

When released later: installable with the ``npm`` package manager,
and usable like ``extensions: [require('buster-qunit')]`` from
``buster.js``.


Compatibility
=============

A desirable goal would be to be able to run any QUnit test automatically, without require to modify them.

Right now, a few manual steps have to be taken to have QUnit tests running. Following that, the tests can be
maintained in a way that they remain runnable in parallel both as a QUnit test, and from buster.js.


1. Javascript dependencies
--------------------------

QUnit tests run from a browser by visiting an html page, and this html contains ``<script>`` tags to load
javascript. In buster, there is no such html. The scripts have to be defined from the ``buster.js``
configuration file, as described in details by the buster documentation. This is a manual step.

(It would be possible to make a conversion tool for this step.)


2. HTML markup for tests
------------------------

In QUnit, there is a ``<div id="main" />`` tag in the template, which is the testing sandbox. It can contain an
initial HTML, which every test can assume is cleaned up before they run. In buster, there is no such html, so
the content of ``#main`` must be built up from the setup method of the test module.

The tests can assume however that ``#main`` exists and is empty, before any test runs.


Missing
=======

1. Async not supported
----------------------

``start()``, ``stop()`` and ``expect(n)`` are not implemented. For most cases, you can use sinon.js's mock timers
for the purpose and avoid writing async tests, or, convert your async tests to such tests.


2. Asserts
----------

Some QUnit asserts may be missing. We add them as we discover this.


