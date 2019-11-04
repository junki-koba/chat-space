$(document).on('turbolinks:load',function(){
$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="messages_upper-info">`
    var html = `<div class="messages_upper-info">
                <div class="messages_upper-info_talker">
                ${message.group_name}
                </div>
                <div class="messages_upper-info_date">
                ${message.created_at}
                </div>
                <p class="lower-message__content">
                ${message.content}
                </p>
                ${imagehtml}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
     var html  = buildHTML(message);
    $('.messages').append(html)
    // $('.input_box').val('') 
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $( ".submit-btn").prop( "disabled", false );
    })
    .fail(function(){
      alert('error');
    })
  })
})
})