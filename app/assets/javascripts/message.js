$(document).on('turbolinks:load',function(){
  $(function(){
    function buildHTML(message){
      var imageHtml = message.image ? `<img class="messages_upper-info" src="${message.image}" >` : ""
      var html = `<div class="messages_upper-info" data-message-id = "${message.id}>
                  <div class="messages_upper-info_talker">
                  ${message.user_name}
                  </div>
                  <div class="messages_upper-info_date">
                  ${message.created_at}
                  </div>
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${imageHtml}
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $(".submit-btn").prop( "disabled", false );
      })
      .fail(function(){
        alert('error');
      });
    })

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
        last_message_id = $('.messages_upper-info:last').data('message-id');
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML='';
          messages.forEach(function(message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          });
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  });
});