$(document).ready(function () {
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');

    $(document).on('click','.show-modal', function(){
        dialog.showModal();
    })

    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
    });
    dialog.querySelector('.print').addEventListener('click', function () {
        print();
    });
})

