<%
response.expires=-1
dim a(30)
'Fill up array with names
a(1)="Abhishek"
a(2)="Bharath"
a(3)="Camel"
a(4)="Dayananda"
a(5)="Energy"
a(6)="Flora"
a(7)="Guest"
a(8)="Hegde"
a(9)="Inertia"
a(10)="Jonathan"
a(11)="Kristen"
a(12)="Linga"
a(13)="Nature"
a(14)="Operation"
a(15)="Petals"
a(16)="Armageddon"
a(17)="Ramesh"
a(18)="Chary"
a(19)="Door"
a(20)="Evening"
a(21)="Savita"
a(22)="Sunnivale"
a(23)="Togadia"
a(24)="Unni krishnan"
a(25)="Violet"
a(26)="Liza"
a(27)="Elizabeth"
a(28)="Ellen"
a(29)="Worcester"
a(30)="Vancover"

'get the q parameter from URL
q=ucase(request.querystring("q"))

'lookup all hints from array if length of q>0
if len(q)>0 then
  hint=""
  for i=1 to 30
    if q=ucase(mid(a(i),1,len(q))) then
      if hint="" then
        hint=a(i)
      else
        hint=hint & " , " & a(i)
      end if
    end if
  next
end if

'Output "no suggestion" if no hint were found
'or output the correct values
if hint="" then
  response.write("no suggestion")
else
  response.write(hint)
end if
%>