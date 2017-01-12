$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  $('#book-delete-cancel').click(closeModal);
});

function closeModal() {
  $('#modal1').modal('close');
}
