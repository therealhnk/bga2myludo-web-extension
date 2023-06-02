var rematchButton = document.getElementById("rematch");

if(rematchButton !== null )
{
    var displayStyle = window.getComputedStyle(rematchButton).display;
    
    if(displayStyle !== 'none' || displayStyle !== 'hide' )
    {      
        var bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

        if(bgaButtonBar !== null && bgaButtonBar.length > 0)
        {
            var link = document.createElement("a");
            link.href = "https://www.myludo.fr";
            link.textContent = "Enregistrer la partie sur MyLudo";
            link.target = "_blank"
            link.classList.add("bgabutton");
            link.classList.add("bgabutton_gray");
            link.id = "myludo_browserextension";
            link.style = "display: inline;"

            Array.from(bgaButtonBar).forEach((element)=>{
                element.appendChild(link);
            });
        }
    }
}