(() => {
	class MainView extends mvc.controllers.Default{

		onShow(tmpl, htmlElement, data, next) {
        	//debugger;
        }

        onSwapViewIn(){
        	//debugger;
        }
	}

	mvc.addController("MainView", MainView);
})();