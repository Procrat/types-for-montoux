# [Montoux needs static type checking and type annotations](https://types-for-montoux.netlify.com/)

## Introduction

Over the years, there has been much frustration amongst the Montoux development
team because we lack types. By that we mean more specifically that we miss
static type checking and type annotations. We write mostly in Clojure and
ClojureScript which both
1. have no form of enforced static type checking,
2. don't require you to write type annotations, and
3. often embrace `nil` as a valid value.

### Problems

1. Because we have no enforced static type checking, we have to resort to
   relying on our test coverage to ensure that we get the types right. Needless
   to say, those tests don't always catch everything and we have to deal with
   obscure bugs -- that often don't even look like type bugs at first -- which
   could have been caught way earlier in the development process.
2. Because we don't have type annotations, developers often spend ridiculous
   amounts of time digging through lots of levels of abstraction layers to find
   out what sort of data structures we're actually dealing with.
3. In Clojure and ClojureScript `nil` can mean a whole range of things, like
   "this thing is not defined", "this thing is defined but we explicitly choose
   to not give it a value", "_any_ empty data structure", "the query you just
   did on a data structure failed but it should be clear why so we won't throw
   an exception", etc. This has two detrimental effects: (a) as a developer,
   we're always forced to think what passing and returning `nil` means for every
   single function definition and function call we write, and (b) instead of
   having interesting exceptions with interesting stack traces, we often get
   `NullPointerExceptions` at an irrelevant point in the code because something
   returned `nil` way earlier in the execution. The latter again leads to
   ridiculous amounts of developer time being lost.

All of these problems make debugging hard, which makes fixing production bugs
(which are often caused by these problems in the first place) extra slow and
therefore more stressful.

### Possible solutions

There are projects like [clojure.spec](https://clojure.org/about/spec), [Typed
Clojure](https://typedclojure.org/) and
[schema](https://github.com/plumatic/schema) that offer optional typing, both as
a means of documentation and to ensure at least some level of correctness.

However, I'm afraid there is not really a magical solution for Clojure and
ClojureScript.
- Optional typing still remains just that, optional, leaving a large surface for
  bugs to occur.
- Our code base has already reached a quite substantial size, with a lot of
  undocumented code of which the institutional knowledge has already left the
  company. Trying to annotate them correctly after the fact would probably take
  about as much time as writing that code from scratch.
- As much as we can restrict not passing `nil` between function we control,
  `clojure.core` and all Clojure libraries we depend on, will still do this.

All these reasons and corresponding failing solutions have led most of the
development team to start looking for other languages, although the road of
migrating existing projects to other languages is often a long and tedious one.


## Type bug tracker

This [page](https://types-for-montoux.netlify.com/) tracks the kind of bugs we
encounter so that we eventually can paint a clear picture of the significance of
this problem at our company.


## Set up your own type bug tracker

- Install with `npm install`.
- Develop with `npm run serve`, which hot-reloads your code.
- Build an optimised version for production with `npm run build`.
- Show and auto-fix linting errors with `npm run lint`.
