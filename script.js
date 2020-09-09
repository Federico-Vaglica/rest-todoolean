$(document).ready(function(){
    readList();

    $(document).on('click','.add-btn', function(){
        $('.main').html('')
        var newElement = $('.input-add').val();

        if(newElement.length != 0){
            $('.list').html('')
            createElement(newElement)
            readList();         
        }  
        $('.input-add').val('')
           
    })

    $(document).on('click','.delete', function (){
        $('.main').html('')
        var elementDelete = $(this)
        var id = elementDelete.parent().attr('data-id');
        deleteElementList(id);
    })

    $(document).on('click','.update', function (){
        
        var id = $(this).attr('data-id');
        var text = $('.inputField[data-id="' + id + '"]').val();
      

        upDateElement(id,text)
    })

    
    
    
    function readList(){
        $.ajax(
          {
            url: "http://157.230.17.132:3033/todos",
            method: "GET",
            success: function (data)
            {
              var source = $("#entry-template").html();
              var template = Handlebars.compile(source);
              for (var i = 0; i < data.length; i++) {
                var todos = data[i];
                var context = {
                  text: todos.text,
                  id: todos.id
                };
                var html = template(context);
                $('.main').append(html);
              }
      
            },
            error: function () {
              alert("E' avvenuto un errore. ");
            }
          });
      
      }



    function createElement(todoValue) {
    $.ajax(
        {
        url: "http://157.230.17.132:3033/todos",
        method: "POST",
        data:{
            text: todoValue
        },
        success: function (){
            $('.list').html()
        },
        error: function () {
            alert("E' avvenuto un errore. ");
        }
        });
    }

    function deleteElementList(id){
        $.ajax(
          {
            url: "http://157.230.17.132:3033/todos/" + id,
            method: "DELETE",
            success: function (){
                readList()
            },
            error: function () {
              alert("E' avvenuto un errore. ");
            }
          });
      }

    function upDateElement(id,toUpdate){
        $.ajax(
            {
              url: "http://157.230.17.132:3033/todos/" + id,
              method: "PUT",
              data: {
                  text: toUpdate
              },

              success: function (data){
                  $('.main').html('');
                  readList()
              },
              error: function () {
                alert("E' avvenuto un errore. ");
              }
            });
    }


})