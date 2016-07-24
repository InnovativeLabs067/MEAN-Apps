/**
 * Created by PK on 8/16/2015.
 */

var op;
function add()
{
    let first_number:number = Number(document.getElementById('first_number')['value']);

    let second_number:number = Number(document.getElementById('second_number')['value']);
    let result=first_number+second_number;
    document.getElementById('result')['value']=result.toString();
}
function diff()
{
    let first_number:number = Number(document.getElementById('first_number')['value']);

    let second_number:number = Number(document.getElementById('second_number')['value']);
    let result=first_number-second_number;
    document.getElementById('result')['value']=result.toString();
}
function product()
{
    let first_number:number = Number(document.getElementById('first_number')['value']);

    let second_number:number = Number(document.getElementById('second_number')['value']);
    let result=first_number*second_number;
    document.getElementById('result')['value']=result.toString();
}
function divide()
{
    let first_number:number = Number(document.getElementById('first_number')['value']);

    let second_number:number = Number(document.getElementById('second_number')['value']);
    let result=first_number/second_number;
    document.getElementById('result')['value']=result.toString();
}

function calculate(){
    var operation=document.getElementsByClassName('opt');
for(var i=0 ;i<4; i++) {
    if (operation[i]['checked']) {
        var selected_op = operation[i]['value'];
    }
}
  switch (selected_op){
      case '+':
          add();
          break;
      case  '-':
          diff();
          break;
      case  '*':
          product();
          break;
      case  '/':
          divide();
          break;
      default :
          alert("Invalid operation or may not apply any operation");

  }


}


