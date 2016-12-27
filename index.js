(function() {

    // initial state
    var initialState = {
        count: 0
    };

    // action map for my simple reducer
    var actionMap = {
        ADD: Add,
        DEL: Del
    }

    // create the store, bind subscriber and exposes as global
    var store = Redux.createStore(MySimpleReducer, initialState);
    store.subscribe(ScreenUpdater);
    store.dispatch({ type: 'INIT' });  // will call the subscribers for the first time
    window.store = store;

    // my simple reducer implementation: uses the actionMap to find the action, and runs
    function MySimpleReducer(state, action) {
        var actionMapped = actionMap[action.type];
        return actionMapped ? actionMapped(state) || state : state;
    }

    // subscriber implementation
    function ScreenUpdater() {
        $('.outpanel .list').append('<div class="pure-u-1-6">[' + store.getState().count +']</div>');
        $('#addButton').attr('disabled', store.getState().count >= 10);
        $('#delButton').attr('disabled', store.getState().count < 1);
    }

    // action Add implementation
    function Add(state) {
        return { count: state.count + 1 };
    }

    // action Del implementation
    function Del(state) {
        return { count: state.count - 1 };
    }

})();

