 $(function() {
    $( ".column" ).draggable({
      connectWith: ".column",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all"
    });
 
    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 
    $( ".portlet-toggle" ).click(function() {
      var icon = $( this );
      icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
      icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });
  });
  
  $("#todo").submit(function(e) {
    $.ajax({
           type: "POST",
           url: url,
           data: $("#todo").serialize(), // serializes the form's elements.
           success: function(data)
           {
           for(var i=0;i<data.length;i++){
           $('body').append('<div class="column">'
            +'<div class="portlet">'
            +'<div class="portlet-header">'+data[i].task+'</div>'
            +'<div class="portlet-content">'+data[i].description+'</div>'
            +'</div>' 
            +'</div>'
          );
           }
            var todos=data;
            console.log(data);
            
              /* bootbox.alert(data, function() {
  
                    });
                    //alert(data)  // show response from the php script.
                    $("#username").val(' ')
                    $('#textarea').val(' ')*/
           }
         });
        
    e.preventDefault(); // avoid to execute the actual submit of the form.
});