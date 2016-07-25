window.app.viewModel.taiKhoanViewModel = (function () {
    var viewModel = {};

    viewModel.init = function () {
        if (viewModel.initialized === true)
            return;

        viewModel.initialized = true;

        //viewModel.load(viewModel);
    };
    return viewModel;
})();