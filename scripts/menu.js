// A menünek megfelelő div megjelenítése

function menuClick() {
    var sender;
    var sParent;
    var eventTargetIndex;
    sender=event.target;
    sParent=sender.parentElement
    for (var i=0 ; i<sParent.children.length ; i++) {
        if (sParent.children[i]==sender) {
            eventTargetIndex=i;
            break;
        }
    }
    if (eventTargetIndex!=actPage) {
        document.getElementById('div'+actPage).classList.remove('displayOn');
        document.getElementById('div'+eventTargetIndex).classList.add('displayOn');
        actPage=eventTargetIndex;   
    }

}