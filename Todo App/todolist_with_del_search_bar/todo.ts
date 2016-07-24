/**
 * Created by pk on 9/7/2015.
 */
/**
 * Created by PK on 8/23/2015.
 */
function add(){

    var bio_data=[{
        name:document.getElementById('name')['value'],
        email:document.getElementById('email')['value'],
        address:document.getElementById('address')['value'],
        roll:document.getElementById('Roll')['value']
    }];
    for(var i=0;i<bio_data.length;i++)
    {

        document.getElementById('output').innerHTML+="<tr><td>"+bio_data[i].roll+"</td>"+"<td>"+bio_data[i].name+"</td>"+"<td>"+bio_data[i].email+"</td>"+"<td>"+bio_data[i].address+"</td></tr>";

    }
}
function del()
{
    var del= document.getElementsByTagName('td');
    var search=document.getElementById('delete_record')['value'];
    for(var i=0;i<del.length;i++)
    {
        if (del[i].innerText == search) {
            del[i].parentElement.remove();
        }
    }


}