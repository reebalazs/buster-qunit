
============
buster-qunit
============

An adapter to enable running QUnit tests from buster.js.

Installation
============

Use the ``npm`` package manager to install this package. Assuming
that you are in the same directory where this README file is
located::

    % sudo npm install -g .


Usage
=====

You will need to create a ``buster.js`` configuration file for
your qunit tests. The ``buster.js`` file in the ``examples``
folder serves as a template. (XXX More explanation needed here.)

To set up a QUnit test suite, the extension has to be selected from ``buster.js``::

    ...
    extensions : [require('buster-qunit')]
    

Compatibility
=============

A desirable goal would be to run any existing QUnit test transparently from ``buster.js``,
without any need to modify or prepare the QUnit tests.

Right now, some preparation is necessary to make QUnit tests compatible with this adapter.
Once this is done, the tests can be maintained in parallel between QUnit and ``buster.js``.


1. Defining which Javascript to load
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


