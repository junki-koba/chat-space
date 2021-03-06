$(document).on('turbolinks:load',function(){
  $(function(){
    function  appendUser(user){
      var html = `<div class="user-search-result">
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `
      $("#user-search-result").append(html)
    }
    function  appendErrMsgToHTML(user){
      var html = `<div class="user-search-result">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">ユーザーが見つかりません</p>
                  </div>
                          `
      $().append(html)
    }
    function  addDleteUser(name,id){
      var html = `<div class="user-search-result">
                <div class="chat-group-user clearfix id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>
                `
      $(".js-add-user").append(html)
    }
    function addMember(userId) {
      let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
      $(".js-add-user").append(html);
    }
    $("#user-search-field").on("keyup",function(){
      var input = $("#user-search-field") .val();
      $.ajax({
        type: 'GET',
        url:  '/users',     
        dataType: 'json',
        data:  {keyword: input},
      })
      .done(function(users){
        $("#user-search-result.row").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがありません");
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      });
    });
    $("#user-search-result").on('click', ".chat-group-user__btn--add", function(){
      
    const  userId = $(this).attr("data-user-id");
    const  userName = $(this).attr("data-user-name");
    $(this)
      .parent()
      .remove()
      addDleteUser(userName,userId);
      addMember(userId);
    });
    $(".js-add-user").on('click', ".chat-group-user__btn--remove",function(){
      $(this)
        .parent()
        .remove()

    });
  });
});