
var bio_data:any[];
function insertItem()
{

      bio_data=[{
        id:document.getElementById('id')['value'],
        name:document.getElementById('name')['value'],
        address:document.getElementById('address')['value'],

    }];
  
    for(var i=0;i<bio_data.length;i++)
    {
        document.getElementById('displaydata').innerHTML+="<tr><td>"+bio_data[i].id+"</td>"+"<td>"+bio_data[i].name+"</td>"+"</td>"+"<td>"+bio_data[i].address+"</td>"+"<td>"+"<input type='button' id='delete' value='Delete' class ='button' onclick='parentNode.parentNode.remove()'>"+"</td></tr>";
 // var  attribute= document.getElementById('delete');
 /* var valueofatt:string=i.toString();
  attribute.setAttribute('id',valueofatt);
   */     
    }
}






