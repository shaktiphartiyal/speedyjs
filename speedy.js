/**
 * Created by shakti on 5/22/17.
 */
(function(){
    class SpeedyBase
    {
        constructor()
        {
            this.node = "";
            this.nodes = "";
            this.caller = "";
            this.speedyListenersKey = "__speedyeh__" + Math.floor(Math.random() * 100000);
            window.SpeedyBase = this;
        }
        _elements(selector)
        {
            this.node = "";
            this.caller = "";
            this.nodes = "";
            return document.querySelectorAll(selector);
        }
        elements(selector)
        {
            this.node = "";
            this.nodes = "";
            this.caller = "";

            this.caller = "many";
            this.nodes = document.querySelectorAll(selector)
            return this;
        }
        element(selector)
        {
            this.node = "";
            this.nodes = "";
            this.caller = "";

            this.caller = "one";
            this.node = document.querySelector(selector);
            return this;
        }
        _consoleErr(msg)
        {
            console.error(msg);
        }
        _consoleWarn(msg)
        {
            console.warn(msg);
        }
        _consoleInfo(msg)
        {
            console.info(msg);
        }
        _isElement(obj)
        {
            try
            {
                return obj instanceof HTMLElement;
            }
            catch(e)
            {
                return (typeof obj==="object") &&
                    (obj.nodeType===1) && (typeof obj.style === "object") &&
                    (typeof obj.ownerDocument ==="object");
            }
        }
    }
    class SpeedyHelpers extends SpeedyBase
    {
        _isHidden(node)
        {
            return node.offsetParent === null;
        }
        _doShow(node)
        {
            node.style.display = "inline-block";
        }
        _doHide(node)
        {
            node.style.display = "none";
        }
        _doToggle(node)
        {
            if(this._isHidden(node))
            {
                this._doShow(node);
            }
            else
            {
                this._doHide(node);
            }
        }
        _doFadeIn(node)
        {
            node.style.opacity = 0;
            node.style.display = "inline-block";
            (function _fade() {
                let val = parseFloat(node.style.opacity);
                if (!((val += .05) > 1))
                {
                    node.style.opacity = val;
                    requestAnimationFrame(_fade);
                }
            })();
        }
        _doFadeOut(node)
        {
            node.style.opacity = 1;
            (function _fade(){
                if ((node.style.opacity -= .05) < 0)
                {
                    node.style.display = "none";
                }
                else
                {
                    requestAnimationFrame(_fade);
                }
            })();
        }
        _doFadeToggle(node)
        {
            if(this._isHidden(node))
            {
                this._doFadeIn(node);
            }
            else
            {
                this._doFadeOut(node);
            }
        }
        _doClick(node)
        {
            node.click();
        }
        _doDblClick(node)
        {
            let event = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            node.dispatchEvent(event);
        }
        _doBlur(node)
        {
            node.blur();
        }
        _doFocus(node)
        {
            node.focus();
        }
        _doSubmit(node)
        {
            node.submit();
        }
        _doReset(node)
        {
            node.reset();
        }
        _doChange(node)
        {
            node.dispatchEvent(new Event('change'));
        }
        _makeEventExpando(node, event, callback)
        {
            if (!node[this.speedyListenersKey])
            {
                node[this.speedyListenersKey] = Object.create(null);
            }
            if (!node[this.speedyListenersKey][event])
            {
                node[this.speedyListenersKey][event] = [];
            }
            node[this.speedyListenersKey][event].push(callback);
        }
        _listen(node, event, callback, removePrevious, options)
        {
            if(removePrevious === true)
            {
                this._removeListener(node, event);
            }
            node.addEventListener(event, callback, options);
            this._makeEventExpando(node, event, callback);
        }
        _listenDynamic(baseElement, evt, node, callback, removePrevious, options)
        {
            if(removePrevious === true)
            {
                this._removeListener(node, event);
            }
            baseElement.addEventListener(evt, function(event) {
                var t = event.target;
                while (t && t !== this)
                {
                    if (t.matches(node))
                    {
                        callback.call(t, event);
                    }
                    t = t.parentNode;
                }
            }, options);
            this._makeEventExpando(baseElement, event, callback);
        }
        _removeAllListeners(node)
        {
            if (!node[this.speedyListenersKey])
            {
                return;
            }
            for(let event of Object.keys(node[this.speedyListenersKey]))
            {

                this._removeListener(node, event);
            }
            delete node[this.speedyListenersKey];
        }
        _removeListener(node, event)
        {
            let handlers = node[this.speedyListenersKey];
            let callbacks = handlers && handlers[event];
            if (callbacks)
            {
                for(let callBack of callbacks)
                {
                    node.removeEventListener(event, callBack);
                }
                delete handlers[event]
            }
        }
        _serialize(obj)
        {
            let str = [];
            for(let p in obj)
                if (obj.hasOwnProperty(p))
                {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
        _addParamToUrl(url, param, value)
        {
            let a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
            let match, str = [];
            a.href = url;
            param = encodeURIComponent(param);
            while (match = regex.exec(a.search))
            {
                if (param != match[1])
                {
                    str.push(match[1]+(match[2]?"="+match[2]:""));
                }
            }
            str.push(param+(value?"="+ encodeURIComponent(value):""));
            a.search = str.join("&");
            return a.href;
        }
    }
    class SpeedySelectors extends SpeedyHelpers
    {
        child()
        {

        }
        parent()
        {

        }
        sibling()
        {

        }
        next()
        {

        }
        previous()
        {

        }
        find()
        {

        }
        closest()
        {

        }
        each()
        {

        }
        equate()
        {

        }
        filter()
        {

        }
        first()
        {

        }
        last()
        {

        }
        has()
        {

        }
        not()
        {

        }
        is()
        {

        }
    }
    class SpeedyManipulate extends SpeedySelectors
    {
        html()
        {
            if(arguments.length == 1)
            {
                try
                {
                    return document.querySelector(arguments[0]).innerHTML.trim();
                }
                catch(e)
                {
                    _._consoleErr("Invalid selector !")
                    return null;
                }
            }
            else if(arguments.length == 2)
            {
                for(let node of this._elements(arguments[0]))
                {
                    node.innerHTML = arguments[1];
                }
            }
        }
        text(selector)
        {
            try
            {
                return document.querySelector(selector).innerText || document.querySelector(selector).textContent;
            }
            catch(e)
            {
                _._consoleErr(e);
                return null;
            }
        }
        value()
        {
            if(arguments.length == 1)
            {
                try
                {
                    return document.querySelector(arguments[0]).value;
                }
                catch(e)
                {
                    _._consoleErr("Invalid selector !")
                    return null;
                }
            }
            else if(arguments.length == 2)
            {
                for(let node of this._elements(arguments[0]))
                {
                    node.value = arguments[1];
                }
            }
        }
        remove(selector)
        {
            for(let node of this._elements(selector))
            {
                node.parentNode.removeChild(node);
            }
        }
        append(selector, data)
        {
            for(let node of this._elements(selector))
            {
                node.insertAdjacentHTML('beforeend', data);
            }
        }
        prepend(selector, data)
        {
            for(let node of this._elements(selector))
            {
                node.insertAdjacentHTML('afterbegin', data);
            }
        }
        before(selector, data)
        {
            for(let node of this._elements(selector))
            {
                node.insertAdjacentHTML('beforebegin', data);
            }
        }
        after(selector, data)
        {
            for(let node of this._elements(selector))
            {
                node.insertAdjacentHTML('afterend', data);
            }
        }
    }
    class SpeedyProperties extends SpeedyManipulate
    {

    }
    class SpeedyEvents extends SpeedyProperties
    {
        click()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doClick(node);
            }
        }
        dblClick()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doDblClick(node);
            }
        }
        blur()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doBlur(node);
            }
        }
        focus()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doFocus(node);
            }
        }
        submit()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doSubmit(node);
            }
        }
        reset()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doReset(node);
            }
        }
        change()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doChange(node);
            }
        }
    }
    class Listeners extends SpeedyEvents
    {
        listen(event, callback, removePrevious, options)
        {
            try
            {
                if(this.caller == "one")
                {
                    if(!this.node)
                    {
                        this._consoleErr("Invalid / Missing Selector !");
                        return false;
                    }
                    this._listen(this.node, event, callback, removePrevious, options);
                }
                else
                {
                    if(this.caller == "many")
                    {
                        if(!this.nodes || this.nodes.length < 1)
                        {
                            this._consoleErr("Invalid / Missing Selector !");
                            return false;
                        }
                        for(let node of this.nodes)
                        {
                            this._listen(node, event, callback, removePrevious, options);
                        }
                    }
                }
            }
            catch(e)
            {
                this._consoleErr(e);
            }
        }
        listenDynamic(event, selector, handler, removePrevious, options)
        {
            try
            {
                if(this.caller == "one")
                {
                    if(!this.node)
                    {
                        this._consoleErr("Invalid / Missing Selector !");
                        return false;
                    }
                    this._listenDynamic(this.node, event, selector, handler, removePrevious, options);
                }
                else
                {
                    if(this.caller == "many")
                    {
                        if(!this.nodes || this.nodes.length < 1)
                        {
                            this._consoleErr("Invalid / Missing Selector !");
                            return false;
                        }
                        for(let parentNode of this.nodes)
                        {
                            this._listenDynamic(parentNode, event, selector, handler, removePrevious, options);
                        }
                    }
                }
            }
            catch(e)
            {
                this._consoleErr(e);
            }
        }
        removeListener(event) /*NOT WORKING FOR DYNAMIC LISTENERS*/
        {
            try
            {
                if(this.caller == "one")
                {
                    if(!this.node)
                    {
                        this._consoleErr("Invalid / Missing Selector !");
                        return false;
                    }
                    this._removeListener(this.node, event);
                }
                else
                {
                    if(this.caller == "many")
                    {
                        if(!this.nodes || this.nodes.length < 1)
                        {
                            this._consoleErr("Invalid / Missing Selector !");
                            return false;
                        }
                        for(let node of this.nodes)
                        {
                            this._removeListener(this.node, event);
                        }
                    }
                }
            }
            catch(e)
            {
                this._consoleErr(e);
            }
        }
        removeAllListeners() /*NOT WORKING FOR DYNAMIC LISTENERS*/
        {
            try
            {
                if(this.caller == "one")
                {
                    if(!this.node)
                    {
                        this._consoleErr("Invalid / Missing Selector !");
                        return false;
                    }
                    this._removeAllListeners(this.node);
                }
                else
                {
                    if(this.caller == "many")
                    {
                        if(!this.nodes || this.nodes.length < 1)
                        {
                            this._consoleErr("Invalid / Missing Selector !");
                            return false;
                        }
                        for(let node of this.nodes)
                        {
                            this._removeAllListeners(node);
                        }
                    }
                }
            }
            catch(e)
            {
                this._consoleErr(e);
            }
        }
        windowLoaded(fn)
        {
            if(typeof(fn) != "function")
            {
                this._consoleErr("Expected Parameter should be of type function !")
                return;
            }
            window.onload = fn();
        }
        domLoaded(fn)
        {
            if(typeof(fn) != "function")
            {
                this._consoleErr("Expected Parameter should be of type function !")
                return;
            }
            if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
            {
                fn();
            }
            else
            {
                document.addEventListener("DOMContentLoaded", fn);
            }
        }
    }
    class Validate extends Listeners
    {

    }
    class SpeedyCommunicate extends Validate
    {
        get isOnLine()
        {
            return navigator.onLine;
        }
        xhr(parameters)
        {
            /**
             * method = GET/POST/PUT/PATCH
             * url
             * complete = function
             * success = function
             * fail = function
             * beforeSend = function
             * timeout = ms
             * data = object to be sent
             * headers = object
             * cacheBuster = boolean
             */
            if(parameters.hasOwnProperty("beforeSend") && typeof(parameters.beforeSend) == "function")
            {
                parameters.beforeSend();
            }
            let xhr = new XMLHttpRequest();
            let async = true;
            let timeout = parameters.hasOwnProperty("timeout")?parameters.timeout:0;
            let data = "";
            let url = document.location;
            if(parameters.hasOwnProperty("url"))
            {
                url = parameters.url;
            }
            if(parameters.hasOwnProperty("cacheBuster") && parameters.cacheBuster == true)
            {
                url = this._addParamToUrl(url, 'spcb'+Math.random().toString(36).substring(7), Math.round(Math.random()*1000000));
            }
            if(parameters.hasOwnProperty("data")) //@TODO add provision for form data
            {
/*                console.log(parameters.data);
                console.log(typeof(parameters.data));
                return;*/
                data = parameters.data;
                data = this._serialize(data);
            }
            if(parameters.hasOwnProperty("async") && parameters.async === false)
            {
                async = false;
            }
            xhr.onload = function (e) {
                if (xhr.readyState === 4)
                {
                    if(parameters.hasOwnProperty("complete"))
                    {
                        parameters.complete(xhr);
                    }
                    if (xhr.status === 200)
                    {
                        if(parameters.hasOwnProperty("success"))
                        {
                            let response = "";
                            response = xhr.responseText;
                            if(xhr.getResponseHeader("Content-Type") == "application/json")
                            {
                                response = JSON.parse(response);
                            }
                            parameters.success(response);
                        }
                    }
                    else
                    {
                        if(parameters.hasOwnProperty("fail"))
                        {
                            parameters.fail(xhr.status, xhr.statusText, xhr);
                        }
                    }
                }
            };
            if(parameters.hasOwnProperty("fail"))
            {
                xhr.addEventListener("error", function(e){
                    parameters.fail(null, null, e);
                });
            }
            xhr.open(parameters.method, url, async);
            if(async === true)
            {
                xhr.timeout = timeout;
            }
            if(parameters.hasOwnProperty('headers'))
            {
                for(let hName in parameters.headers)
                {
                    if (parameters.headers.hasOwnProperty(hName))
                    {
                        xhr.setRequestHeader(hName, parameters.headers[hName]);
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('XHR-created-by', 'SpeedyJS');
            xhr.send(data);
        }
        hitAPI(url)
        {
            let img = new Image();
            img.src = url;
        }
        sendBeacon(url, data)
        {
            window.addEventListener('unload', function () {
                return navigator.sendBeacon(url, data);
            }, false);
        }
    }
    class SpeedyToggle extends SpeedyCommunicate
    {
        show()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doShow(node);
            }
        }
        hide()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doHide(node);
            }
        }
        toggle()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doToggle(node);
            }
        }
        fadeIn()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doFadeIn(node);
            }
        }
        fadeOut()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doFadeOut(node);
            }
        }
        toggleFade()
        {
            for(let node of this._elements(arguments[0]))
            {
                this._doFadeToggle(node);
            }
        }
    }
    class Speedy extends SpeedyToggle
    {

    }
    window._  = new Speedy();
})();