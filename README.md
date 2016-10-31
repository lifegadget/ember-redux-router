# ember-redux-router
> adds the route to the redux state machine (`ember-redux-core`)

## Install

    ember install ember-redux-core
    ember install ember-redux-router

## Approach, status, and collaboration

This addon works well for basic requirements. It will ensure than whether you use 
the `link-to` helper or Ember's `transitionTo`/`transitionToRoute` methods that the
redux state tree will be updated to reflect the route state. All state is maintained off of the `@router` node of the state tree.

What does NOT happen currently is the following:

- If a route is cancelled/rejected this is not currently caught
- If the action "TRANSITION_REQUESTED" is dispatched this by itself will _not_ transition Ember's route. This means that "time travel" is not currently working.

If anyone would be interested in working on these two matters (or anything really) I would love to collaborate. Reach out to me at ken@ken.net and we'll figure out the best way to work together.

## License
Copyright (c) 2016 LifeGadget Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
