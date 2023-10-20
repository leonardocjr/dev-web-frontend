function contador(){
    var i = 0;
    for(i=1; i<=10; i++){
        if (i % 2 === 0){
            document.write("<h3>" + i + " = numero par</h3>")
        }else{
            document.write("<h3>" + i + " = numero impar</h3>")
        }
    }
}