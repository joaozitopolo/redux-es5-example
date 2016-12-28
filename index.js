(function(_) {

    // action map for my simple reducer
    var actionMap = {
        '': Init,
        ADD: Add,
        DEL: Del
    }

    // create the store, bind subscriber and exposes as global
    var store = Redux.createStore(MySimpleReducer, {});
    store.subscribe(ScreenUpdater);
    window.store = store;

    // executes init action
    store.dispatch({ type: '' });

    // my simple reducer implementation: uses the actionMap to find the action, and invokes the action
    function MySimpleReducer(state, action) {
        var actionMapped = actionMap[action.type];
        if(actionMapped) {
            var clonedState = _.clone(state);
            return actionMapped(clonedState, action) || clonedState;
        } else {
            return state;
        }
    }

    // subscriber test implementation
    function ScreenUpdater() {
        $('.outpanel .list').append('<div class="pure-u-1-6 '  + store.getState()['style'] + '"><span class="label">' + store.getState().count +'</span></div>');
        $('#addButton').attr('disabled', store.getState().count >= 10);
        $('#delButton').attr('disabled', store.getState().count < 1);
    }

    // action Init implementation
    function Init(state, action) {
        state.count = 0;
    }

    // action Add implementation
    function Add(state, action) {
        state.count++;
        state.style = 'added';
    }

    // action Del implementation
    function Del(state, action) {
        state.count--;
        state.style = '';
    }

})(_);
