/*
 * leblebi.js
 * Author: Aykut Kardaş
 * Github: github.com/aykutkardas
 */

function leblebi(data){

    if (data.target) {

        if (!data.target.tagName) {
            data.target = document.querySelector(data.target);
        }

        window._leblebi = data;
        window._leblebi.target = data.target;
        window._leblebi.step = -1;

    }

    // Results element style.
    var styleElement = document.createElement('style');
    var styleContent = document.createTextNode('.leblebi-results{background:#fff;border:1px solid #ccc;padding:1px;display:none}.leblebi-item{cursor:pointer;padding:6px}.leblebi-item.select,.leblebi-item:hover{background:#2666b9;color:#fff}');
    styleElement.appendChild(styleContent);
    document.head.insertBefore(styleElement, document.head.firstChild);

    // Create leblebi result element.
    var leblebiResultsElem = document.createElement('div');
    leblebiResultsElem.classList.add('leblebi-results');
    document.body.appendChild(leblebiResultsElem);

    // Set element style.
    Object.assign(leblebiResultsElem.style, {
        display: 'none',
        position: 'absolute'
    });

    function setPosition() {
        // Get input position.
        var inputPosition               = _leblebi.target.getBoundingClientRect();
        var leblebiResultsMinWidth      = inputPosition.width - 4 + "px";
        var leblebiResultsPositionTop   = inputPosition.top + inputPosition.height + "px";
        var leblebiResultsPositionLeft  = inputPosition.left + "px";

        // Set input position.
        Object.assign(leblebiResultsElem.style, {
            top: leblebiResultsPositionTop,
            left: leblebiResultsPositionLeft,
            minWidth: leblebiResultsMinWidth
        });
    }

    setPosition()
    window.addEventListener('resize', setPosition)

    function _keyupFn(e){
        
        var up    = 40;
        var down  = 38;
        var enter = 13;
        var val   = _leblebi.target.value;
        var key   = new RegExp(val, "gmi");
        var limit = _leblebi.limit || 10;
        var resultsElem = document.querySelector('.leblebi-results');
        var results;

        function pasteInput(val){
            _leblebi.target.value = val;
            resultsElem.style.display = 'none';
            _leblebi.step = -1;
        }

        // Clean .
        resultsElem.innerHTML = "";              

        resultsElem.style.display = 'none';
        for(var i = 0; i < _leblebi.source.length; i++) {

            var sourceItem;

            if(_leblebi.field) {
                sourceItem = _leblebi.source[i][_leblebi.field];
                
            } else {
                sourceItem = _leblebi.source[i];
            }

            var re = key.exec(sourceItem);

            if(re){
                
                if (_leblebi.target.value.length == 0) resultsElem.style.display = 'none';
                else resultsElem.style.display = 'table';

                var emphasis = sourceItem.replace(re[0], re[0].bold());
                var liElement = document.createElement('div');
                liElement.classList.add('leblebi-item');
                
                liElement.innerHTML = emphasis;
                resultsElem.appendChild(liElement);

                results = document.querySelectorAll('.leblebi-results .leblebi-item');
                if (results.length >= _leblebi.limit) break;

                if(results.length > 0) {

                    for (var j = 0; j < results.length; j++) {
                        results[j].addEventListener('click', function(){
                            pasteInput(this.innerText);
                            resultsElem.style.display = 'none';
                        });
                    }

                }

            }

        }

        switch (e.keyCode) {
            case up:
                if (_leblebi.step !== results.length - 1) {
                    results[++_leblebi.step].classList.add('select');
                } else {
                    _leblebi.step = 0;
                    results[_leblebi.step].classList.add('select');
                }

                break;

            case down:
                if (_leblebi.step != 0 && _leblebi.step != -1) {
                    results[--_leblebi.step].classList.add('select');
                } else {
                    _leblebi.step = results.length - 1;
                    results[_leblebi.step].classList.add('select');
                }
                break;

            case enter:
                pasteInput(results[_leblebi.step].innerText);
                resultsElem.style.display = 'none';
                break;

            default:
                _leblebi.step = -1;
                break;
        }

    }

    _leblebi.target.addEventListener('keyup', function(e){
        _keyupFn(e);
    });

}

// jQuery Method
// $(selector).leblebi({data});

if (typeof $ === "function" && typeof $.fn === "object") {

    $.fn.leblebi = function (data) {

        data.target = $(this)[0];
        leblebi(data);

    };

}
