startSmoothScroll();

function startSmoothScroll() {
    if (isSupported()) {
        document.getElementById('css-support-msg').className = 'supported';
        return;
    }
    
    const DURATION = 400;
    
    var pageUrl = location.hash
        ? stripHash(location.href)
        : location.href
    ;
    
    hijackLink();

    function hijackLink() {
        document.body.addEventListener('click', onClick, false);
        
        function onClick(e) {
            if (!isInPageLink(e.target))
                return;
            
            e.stopPropagation();
            e.preventDefault();
            
            jump(e.target.hash, {
                duration: DURATION,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' 
            && n.hash.length > 0
            && stripHash(n.href) === pageUrl
        ;
    }
        
    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }
    
    function isSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }

}
