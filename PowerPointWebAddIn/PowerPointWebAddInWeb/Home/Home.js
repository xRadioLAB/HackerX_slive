/// <reference path="/Scripts/FabricUI/MessageBanner.js" />

(function () {
    "use strict";

    var messageBanner;
    var Globals = {
        activeViewHandler:null,
    };

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            var element = document.querySelector('.ms-MessageBanner');
            messageBanner = new fabric.MessageBanner(element);
            messageBanner.hideBanner();

            registerActiveViewChanged();

            $('#get-data-from-selection').click(getDataFromSelection);
            $('#get-file-view').click(getCurrentSlide);
        });
    };

    function getFileView() {
        //Gets whether the current view is edit or read.
        Office.context.document.getActiveViewAsync(function (asyncResult) {
            if (asyncResult.status == "failed") {
                showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
            }
            else {
                showNotification('Current View is:', asyncResult.value);
            }
        });
    }

    function getFileView() {
        //Gets whether the current view is edit or read.
        Office.context.document.getActiveViewAsync(function (asyncResult) {
            if (asyncResult.status == "failed") {
                showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
            }
            else {
                showNotification('Current View is:', asyncResult.value);
            }
        });
    }

    function registerActiveViewChanged() {
       
        Globals.activeViewHandler = function (args) {
            showNotification('Current View is: ', JSON.stringify(args))
        };

        Office.context.document.addHandlerAsync(Office.EventType.ActiveViewChanged, Globals.activeViewHandler,
            function (asyncResult) {
                if (asyncResult.status == "failed") {
                    showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
                }
                else {
                    showNotification('Reg Current View Status:', asyncResult.status);
                }
            });
    }

    function getCurrentSlide() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, function (asyncResult) {
            if (asyncResult.status == "failed") {
                showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
            }
            else {
                var firstSlideId = asyncResult.value.slides[0].id;
                showNotification('ID:', JSON.stringify(asyncResult.value));
            }
        });
    }

    // Reads data from current document selection and displays a notification
    function getDataFromSelection() {
        if (Office.context.document.getSelectedDataAsync) {
            Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
                function (result) {
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        showNotification('The selected text is:', '"' + result.value + '"');
                    } else {
                        showNotification('Error:', result.error.message);
                    }
                }
            );
        } else {
            app.showNotification('Error:', 'Reading selection data is not supported by this host application.');
        }
    }
    
    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notificationHeader").text(header);
        $("#notificationBody").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();