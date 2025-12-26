// THIS IS A COMMENT. DO NOT COPY THIS COMMENT.
// Replace the date with your own birthdate WITHIN the double quotation marks (""). Do NOT remove those quotation marks!

var dob = new Date("05/26/2000");
var month_diff = Date.now() - dob.getTime();
var age_dt = new Date(month_diff);
var year = age_dt.getUTCFullYear();
var age = Math.abs(year - 1970);
document.getElementById("age").innerHTML = age;