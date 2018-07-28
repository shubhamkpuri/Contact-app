var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems, {});
var elems1 = document.querySelectorAll('.modal');
var instances1 = M.Modal.init(elems1, {});
var elems2 = document.querySelectorAll('.collapsible');
var instances2 = M.Collapsible.init(elems2, {});
var elems3 = document.querySelectorAll('select');
var instances3 = M.FormSelect.init(elems3, {});
M.updateTextFields();
