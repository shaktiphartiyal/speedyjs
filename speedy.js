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
            this.loaderImage = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><path fill="#000000" fill-opacity="1" d="M111.708,49A50.116,50.116,0,0,0,79,16.292V1.785A64.076,64.076,0,0,1,126.215,49H111.708ZM49,16.292A50.114,50.114,0,0,0,16.292,49H1.785A64.075,64.075,0,0,1,49,1.785V16.292ZM16.292,79A50.116,50.116,0,0,0,49,111.708v14.507A64.076,64.076,0,0,1,1.785,79H16.292ZM79,111.708A50.118,50.118,0,0,0,111.708,79h14.507A64.078,64.078,0,0,1,79,126.215V111.708Z"><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-90 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" d="M96.971,53.633a34.634,34.634,0,0,0-22.6-22.6V21A44.283,44.283,0,0,1,107,53.633H96.971Zm-43.338-22.6a34.634,34.634,0,0,0-22.6,22.6H21A44.283,44.283,0,0,1,53.633,21V31.029Zm-22.6,43.338a34.634,34.634,0,0,0,22.6,22.6V107A44.283,44.283,0,0,1,21,74.367H31.029Zm43.338,22.6a34.634,34.634,0,0,0,22.6-22.6H107A44.283,44.283,0,0,1,74.367,107V96.971Z"><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="90 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" d="M85.47,57.25A22.552,22.552,0,0,0,70.75,42.53V36A28.836,28.836,0,0,1,92,57.25H85.47ZM57.25,42.53A22.552,22.552,0,0,0,42.53,57.25H36A28.836,28.836,0,0,1,57.25,36V42.53ZM42.53,70.75A22.552,22.552,0,0,0,57.25,85.47V92A28.836,28.836,0,0,1,36,70.75H42.53ZM70.75,85.47A22.552,22.552,0,0,0,85.47,70.75H92A28.836,28.836,0,0,1,70.75,92V85.47Z"><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="-90 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></path></svg>';
            this.speedyListenersKey = "__speedyeh__" + Math.floor(Math.random() * 100000);
            window.SpeedyActiveObject = this;
        }
        _elements(selector)
        {
            this.node = "";
            this.caller = "";
            this.nodes = "";
            if(selector instanceof HTMLElement)
            {
                let selected = [];
                selected.push(selector);
                return selected;
            }
            return document.querySelectorAll(selector);
        }
        _element(selector)
        {
            this.node = "";
            this.caller = "";
            this.nodes = "";
            if(selector instanceof HTMLElement)
            {
                let selected = [];
                selected.push(selector);
                return selected;
            }
            return document.querySelector(selector);
        }
        elements(selector)
        {
            this.node = "";
            this.nodes = "";
            this.caller = "";
            this.caller = "many";
            if(selector instanceof HTMLElement)
            {
                let selected = [];
                selected.push(selector);
                this.nodes = selected;
            }
            else
            {
                this.nodes = document.querySelectorAll(selector);
            }
            return this;
        }
        element(selector)
        {
            this.node = "";
            this.nodes = "";
            this.caller = "";
            this.caller = "one";
            if(selector instanceof HTMLElement)
            {
                let selected = [];
                selected.push(selector);
                this.node = selected;
            }
            else
            {
                this.node = document.querySelector(selector);
            }
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
        child(selector)
        {
            for(let node of this._elements(selector))
            {
                let c = node.children;
                if(c.length > 0)
                {
                    return c[0];
                }
            }
        }
        children(selector)
        {
            let children = [];
            for(let node of this._elements(selector))
            {
                children = node.children;
            }
            return children;
        }
        parent(selector)
        {
            let elem = this._elements(selector)[0];
            return elem.parentNode;
        }
        siblings(selector)
        {
            let siblings = [];
            for(let node of this._elements(selector))
            {
                siblings.push(node.previousElementSibling);
                siblings.push(node.nextElementSibling);
            }
            return siblings;
        }
        next(selector)
        {
            let next = [];
            for(let node of this._elements(selector))
            {
                next.push(node.nextElementSibling);
            }
            return next;
        }
        previous(selector)
        {
            let prev = [];
            for(let node of this._elements(selector))
            {
                prev.push(node.previousElementSibling);
            }
            return prev;
        }
        find(selector, what)
        {
            let elem = [];
            for(let node of this._elements(selector))
            {
                elem = node.querySelectorAll(what);
            }
            return elem;
        }
        closest(selector, theElement)
        {
            let node = this._elements(selector)[0];
                var matchesFn;
                ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
                    if (typeof document.body[fn] == 'function') {
                        matchesFn = fn;
                        return true;
                    }
                    return false;
                });
                var parent;
                while (node)
                {
                    parent = node.parentElement;
                    if (parent && parent[matchesFn](theElement))
                    {
                        return parent;
                    }
                    node = parent;
                }
                return undefined;
        }
        first(selector)
        {
            return this._elements(selector)[0];
        }
        nth(selector, n)
        {
            let elements = this._elements(selector);
            if(n > elements.length)
            {
                return undefined;
            }
            return elements[n-1];
        }
        last(selector)
        {
            let elements = this._elements(selector);
            return elements[elements.length-1];
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
                    if(arguments[0] instanceof HTMLElement)
                    {
                        return arguments[0].innerHTML.trim();
                    }
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
                if(selector instanceof HTMLElement)
                {
                    return selector.innerText || selector.textContent;
                }
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
                    if(arguments[0] instanceof HTMLElement)
                    {
                        return arguments[0].value;
                    }
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
        disable(selector)
        {
            for(let node of this._elements(selector))
            {
                node.disabled = true;
            }
        }
        enable(selector)
        {
            for(let node of this._elements(selector))
            {
                node.disabled = false;
            }
        }
        toggleDisable(selector)
        {
            for(let node of this._elements(selector))
            {
                if(node.disabled)
                {
                    node.disabled = false;
                }
                else
                {
                    node.disabled = true;
                }
            }
        }
        loading(opt)
        {
            let loadingHTML = '<section style="position: relative;" id="xFulLoading"><div style="min-height: 100%;height: 100%;min-width: 100%;width: 100%;top: 0;left: 0;background: rgba(0, 0, 0, 0.4);z-index: 9999;position: fixed;"><div style="text-align: center;color: #fff;width: 100px;height: 100px;position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;">'+this.loaderImage+'</div></div></section>';
            if(opt)
            {
                if(_._elements('#xFulLoading').length == 0)
                {
                    _.append('body', loadingHTML);
                }
            }
            else
            {
                _.remove('#xFulLoading');
            }
        }
        css(selector, styleObj)
        {
            for(let node of this._elements(selector))
            {
                for(let prop in styleObj)
                {
                    node.style[prop] = styleObj[prop];
                }
            }
        }
        addClass(selector, className)
        {
            for(let node of this._elements(selector))
            {
                if (node.classList)
                {
                    node.classList.add(className);
                }
                else
                {
                    node.className += ' ' + className;
                }
            }
        }
        removeClass(selector, className)
        {
            for(let node of this._elements(selector))
            {
                if (node.classList)
                {
                    node.classList.remove(className);
                }
                else
                {
                    node.className = node.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }
        }
        hasClass(selector, className)
        {
            let element = this._elements(selector)[0];
            return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
        }
    }
    class SpeedyProperties extends SpeedyManipulate
    {
        attr(selector, attribute, value)
        {
            let node = this._elements(selector)[0];
            if(value)
            {
                node.setAttribute(attribute, value);
            }
            else
            {
                return node.getAttribute(attribute);
            }
        }
        data(selector, attribute, value)
        {
            for(let node of this._elements(selector))
            {
                if(value)
                {
                    node.setAttribute('data-'+attribute, value);
                }
                else
                {
                    return node.getAttribute('data-'+attribute);
                }
            }
        }
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
        removeListener(event) /* @TODO NOT WORKING FOR DYNAMIC LISTENERS*/
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
        isEmail(email)
        {
            if(!email)
            {
                return false;
            }
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
        isURL(url)
        {
            if(!url)
            {
                return false;
            }
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
        }
        passwordStrength(passwd)
        {
            let strength = (strength + passwd.length);
            if (passwd.match(/[a-z]/))
            {
                strength = (strength + 15);
            }
            if (passwd.match(/[A-Z]/))
            {
                strength = (strength + 12);
            }
            if (passwd.match(/\d+/))
            {
                strength = (strength + 15);
            }
            if (passwd.match(/(\d.*\d)/))
            {
                strength = (strength + 10);
            }
            if (passwd.match(/[!,@#$%^&*?_~]/))
            {
                strength = (strength + 15);
            }
            if (passwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/))
            {
                strength = (strength + 15);
            }
            if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/))
            {
                strength = (strength + 10);
            }
            if (passwd.match(/\d/) && passwd.match(/\D/))
            {
                strength = (strength + 10);
            }
            if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/) && passwd.match(/\d/) && passwd.match(/[!,@#$%^&*?_~]/))
            {
                strength = (strength + 10);
            }
            if(strength > 100)
            {
                strength = 100;
            }
            return strength;
        }
        isNumber(num)
        {
            return /^\d+$/.test(num);
        }
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
            let method = "GET";
            if(parameters.hasOwnProperty('method'))
            {
                method = parameters.method;
            }
            if(parameters.hasOwnProperty("url"))
            {
                url = parameters.url;
            }
            if(parameters.hasOwnProperty("cacheBuster") && parameters.cacheBuster == true)
            {
                url = this._addParamToUrl(url, 'spcb'+Math.random().toString(36).substring(7), Math.round(Math.random()*1000000));
            }
            if(parameters.hasOwnProperty("data"))
            {
                data = parameters.data;
                if(data instanceof FormData === false)
                {
                    if(method === "GET")
                    {
                        for (let key in data)
                        {
                            url = SpeedyActiveObject._addParamToUrl(url, key, data[key]);
                        }
                    }
                    else if(method === "POST")
                    {
                        let frmData = new FormData();
                        for (let key in data)
                        {
                            frmData.append(key, data[key]);
                        }
                        data = frmData;
                    }
                    else
                    {
                        data = this._serialize(data);
                    }
                }
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
            xhr.open(method, url, async);
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
            if(method === "GET")
            {
                xhr.send();
            }
            else
            {
                xhr.send(data);
            }
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
        getJSONP(url, callback)
        {
            var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                callback(data);
            };
            var script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
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
    window.SpeedyBase = SpeedyBase;
    window._  = new Speedy();
})();