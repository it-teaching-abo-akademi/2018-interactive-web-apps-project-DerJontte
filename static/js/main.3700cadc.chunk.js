(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,n){e.exports=n(95)},42:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(19),o=n.n(i),l=(n(42),n(1)),c=n(7),u=n.n(c),s=n(12),d=n(5),h=n(6),p=n(9),f=n(8),m=n(10),v=n(2),b=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,null,[{key:"EtoD",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return"EUR"in localStorage&&(this.rateEtoD=JSON.parse(localStorage.getItem("EUR")).value),(e*this.rateEtoD).toFixed(4)}},{key:"DtoE",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return"EUR"in localStorage&&(this.rateEtoD=JSON.parse(localStorage.getItem("EUR")).value),(e*(1/this.rateEtoD)).toFixed(4)}}]),e}();function x(){var e=Object(l.a)(["\n            display: table-cell;\n            min-width: 150px;\n            max-height: 48px;\n            text-align: right;\n            @media screen and (max-width: 360px) {\n                width: 150px;\n                text-align: center;\n            }\n        "]);return x=function(){return e},e}function g(){var e=Object(l.a)(["\n            @media screen and (max-width: 360px) {\n            width: 150px;\n        "]);return g=function(){return e},e}function y(){var e=Object(l.a)(["\n            display: flex;\n            flex-direction: row;\n            justify-content: space-between;\n            width: calc(100vw - 70px);\n            max-width: 1330px;\n            @media screen and (max-width: 1024px) {\n                width: calc(100% - 35px);\n                max-width: 650px;\n            }\n            @media screen and (max-width: 360px) {\n                flex-direction: column;\n                align-items: center;\n            }\n        "]);return y=function(){return e},e}function k(){var e=Object(l.a)(["\n            width: 148px;\n            margin-bottom: 10px;\n        "]);return k=function(){return e},e}b.rateEtoD=1;var w=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=v.a.button(k()),t=v.a.div(y()),n=v.a.div(g()),a=v.a.div(x());return r.a.createElement(t,null,r.a.createElement(n,null,r.a.createElement(e,{onClick:this.props.caller.addPortfolio.bind(this.props.caller)},"Create New Portfolio"),r.a.createElement(e,{onClick:this.props.caller.updateValues.bind(this.props.caller)},"Update stock values"),r.a.createElement(e,{onClick:this.props.caller.updateForex.bind(this.props.caller)},"Update exchange rate")),r.a.createElement(a,null,"1 EUR = ",b.EtoD()," USD",r.a.createElement("br",null),"1 USD = ",b.DtoE()," EUR"))}}]),t}(a.Component),E=function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;Object(d.a)(this,e),this.symbol=t,this.value=n,this.amount=a,this.totalValue=this.value*this.amount,this.updated=r}return Object(h.a)(e,[{key:"getTotalValue",value:function(){return this.value*this.amount}},{key:"setValue",value:function(e){this.value=e,this.totalValue=this.value*this.amount}}]),e}(),O=n(33),j=n.n(O),S=function(){function e(){Object(d.a)(this,e)}return Object(h.a)(e,null,[{key:"checkTimeout",value:function(e,t){var n=Date.now()-t;return!(e in localStorage&&JSON.parse(localStorage.getItem(e)).updated>n)}},{key:"getCurrentForex",value:function(e){if(this.checkTimeout("EUR",6e4)){this.whoCalled=e;this.doQuery("CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD","EUR",["Realtime Currency Exchange Rate","5. Exchange Rate"])}}},{key:"getCurrentStockValue",value:function(){var e=Object(s.a)(u.a.mark(function e(t,n){var a,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.checkTimeout(n,18e5)){e.next=8;break}return this.whoCalled=t,n=n.toUpperCase(),a=["Global Quote","05. price"],e.next=6,this.doQuery("GLOBAL_QUOTE&symbol="+n,n,a);case 6:return r=e.sent,e.abrupt("return",r);case 8:return e.abrupt("return",200);case 9:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"getStockHistory",value:function(){var e=Object(s.a)(u.a.mark(function e(t,n){var a,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.whoCalled=t,a=n+"History",n=n.toUpperCase(),r=["Time Series (Daily)"],e.next=6,this.doQuery("TIME_SERIES_DAILY&symbol="+n+"&outputsize=full",a,r);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"doQuery",value:function(e,t,n){var a=this.whoCalled,r="https://www.alphavantage.co/query?function="+e+"&apikey=H8OY9QDX5HW2FG6T";return new Promise(function(e){setTimeout(function(){e(504)},1e4),j.a.getJSON(r,function(r){if("Note"in r){if(!("requestLimit"in sessionStorage&&sessionStorage.getItem("requestLimit")>Date.now()-61e3)){alert("Could not fetch all requested stock data due to restrictions on free AlphaVantage API-keys, try again in a moment.\n\nThe server said:\n"+JSON.parse(this.responseText).Note),sessionStorage.setItem("requestLimit",Date.now())}e(200)}else{n.forEach(function(e){return r=r[e]});var i={value:r,updated:Date.now()};localStorage.setItem(t,JSON.stringify(i)),a.saveState(),e(200)}})})}}]),e}(),C=n(34);function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var I=r.a.createElement("g",null,r.a.createElement("g",null,r.a.createElement("path",{d:"M256,151c-57.897,0-105,47.103-105,105c0,57.897,47.103,105,105,105c57.897,0,105-47.103,105-105 C361,198.103,313.897,151,256,151z M256,331c-41.355,0-75-33.645-75-75c0-41.355,33.645-75,75-75s75,33.645,75,75 S297.355,331,256,331z"}))),U=r.a.createElement("g",null,r.a.createElement("g",null,r.a.createElement("path",{d:"M500.582,211.434l-58.674-14.428c-3.532-11.13-8.068-21.925-13.551-32.249c8.78-14.634,27.343-45.573,27.343-45.573 c3.541-5.902,2.611-13.457-2.256-18.324l-42.426-42.426c-4.867-4.867-12.422-5.797-18.324-2.256 c-0.38,0.228-30.777,18.466-45.626,27.355c-10.269-5.431-20.995-9.927-32.052-13.434c-4.428-17.976-14.451-58.686-14.452-58.686 C298.914,4.711,292.902,0,286,0h-60c-6.903,0-12.915,4.711-14.565,11.414c-4.126,16.76-11.024,44.779-14.45,58.68 c-11.762,3.73-23.143,8.578-34.001,14.482c-6.428-3.856-16.007-9.604-24.869-14.921l-22.462-13.477 c-5.905-3.541-13.457-2.61-18.324,2.256L54.901,100.86c-4.867,4.867-5.797,12.422-2.256,18.324 c0.2,0.335,17.785,29.644,29.271,48.869c-4.712,9.31-8.665,18.986-11.817,28.919c-20.002,4.976-58.223,14.35-58.671,14.46 C4.718,213.077,0,219.092,0,226v60c0,6.909,4.719,12.923,11.429,14.568c0.443,0.109,38.381,9.411,58.687,14.436 c3.565,11.302,8.184,22.273,13.796,32.78l-26.194,43.66c-3.541,5.902-2.611,13.458,2.256,18.324l42.427,42.427 c4.867,4.868,12.421,5.797,18.324,2.256c0.369-0.222,29.463-17.678,43.746-26.227c10.419,5.547,21.313,10.131,32.547,13.692 l14.416,58.66C213.079,507.284,219.093,512,226,512h60c6.904,0,12.917-4.713,14.566-11.418l14.427-58.669 c11.539-3.661,22.671-8.39,33.257-14.128c14.427,8.656,44.444,26.667,44.444,26.667c5.901,3.541,13.457,2.612,18.324-2.256 l42.426-42.427c4.867-4.867,5.797-12.422,2.256-18.324c0,0-18.271-30.452-26.958-44.931c5.308-10.088,9.712-20.634,13.161-31.511 c17.824-4.399,58.19-14.317,58.676-14.436C507.285,298.919,512,292.906,512,286v-60C512,219.095,507.287,213.083,500.582,211.434z M482,274.24c-17.32,4.257-48.723,11.979-54.72,13.479l-1.131,0.283c-5.231,1.36-9.326,5.43-10.719,10.653 c-3.795,14.229-9.495,27.872-16.942,40.548c-2.779,4.732-2.753,10.605,0.069,15.312c0.78,1.301,16.489,27.483,25.393,42.322 L398.087,422.7c-15.046-9.027-41.716-25.029-41.942-25.165c-4.775-2.866-10.743-2.853-15.501,0.035 c-13,7.885-27.109,13.892-41.938,17.854c-5.177,1.383-9.224,5.422-10.614,10.597c-0.828,3.081-1.644,6.34-1.658,6.397L274.241,482 h-36.479l-10.813-44.042l-2.916-11.664c-1.322-5.292-5.415-9.45-10.686-10.855c-14.533-3.876-28.479-9.747-41.449-17.447 c-4.709-2.797-10.57-2.802-15.285-0.018c-3.23,1.908-27.254,16.313-41.282,24.728l-25.865-25.865l24.661-41.104 c2.841-4.736,2.85-10.65,0.022-15.395c-7.784-13.063-13.685-27.073-17.535-41.643c-1.397-5.286-5.56-9.393-10.863-10.719 c-10.737-2.684-39.564-9.767-55.752-13.741v-36.473c16.342-4.015,45.537-11.199,55.762-13.786 c5.271-1.334,9.408-5.417,10.812-10.671c3.564-13.347,8.822-26.228,15.63-38.286c2.646-4.686,2.578-10.43-0.177-15.053 c-7.25-12.166-20.08-33.577-27.632-46.172l25.865-25.866l12.42,7.452c14.968,8.981,31.98,19.188,32.44,19.463 c4.768,2.85,10.722,2.832,15.472-0.049c13.341-8.088,27.726-14.222,42.756-18.232c5.264-1.404,9.352-5.552,10.68-10.836 c0.282-1.121,9.071-36.815,13.728-55.726h36.49c4.915,19.958,13.621,55.312,13.724,55.722c1.326,5.288,5.417,9.44,10.685,10.845 c14.382,3.836,28.193,9.626,41.05,17.208c4.714,2.781,10.57,2.773,15.276-0.021c4.208-2.498,28.881-17.293,43.106-25.827 l25.864,25.864c-9.037,15.062-25.121,41.869-25.795,42.991c-2.836,4.725-2.853,10.625-0.043,15.367 c7.628,12.872,13.451,26.714,17.308,41.141c1.382,5.167,5.408,9.207,10.57,10.604c3.097,0.839,6.373,1.657,6.428,1.671 L482,237.758V274.24z"}))),R=function(e){return r.a.createElement("svg",D({version:1.1,id:"Layer_1",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 512 512",style:{enableBackground:"new 0 0 512 512"},xmlSpace:"preserve"},e),I,U)};n.p;function V(){var e=Object(l.a)(["\n            display: inline-block;\n            width: 50%;\n            animation: spin 5s infinite linear;\n            @keyframes spin {\n            from {\n                transform:rotate(0deg);\n            }\n            to {\n                transform:rotate(360deg);\n            }"]);return V=function(){return e},e}function N(){var e=Object(l.a)(["\n            position: absolute;\n            text-align: center;\n            background-color: rgba(222, 222, 160, 1);\n            width: auto;\n            height: auto;\n            padding: 2em;\n            padding-bottom: 1em;\n            top: 30%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            border-radius: 10px;\n            border: 3px dashed black;\n            color: black;\n        "]);return N=function(){return e},e}function P(){var e=Object(l.a)(["\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            margin: 0;\n            background: rgba(0, 0, 0, 0.3);\n            z-index: 1;\n            visibility: hidden;\n        "]);return P=function(){return e},e}var T=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=v.a.div(P()),t=v.a.div(N()),n=v.a.div(V());return r.a.createElement(e,{id:"busyOverlay"},r.a.createElement(t,null,"Loading, please wait...",r.a.createElement("p",null,r.a.createElement(n,null,r.a.createElement(R,null)))))}}],[{key:"set",value:function(){this.overlay=document.getElementById("busyOverlay"),this.overlay.style.visibility="visible"}},{key:"unset",value:function(){this.overlay.style.visibility="hidden"}}]),t}(a.Component);function B(){var e=Object(l.a)(["\n            float: right;\n            align-self: flex-end;\n            flex-grow: 1;\n        "]);return B=function(){return e},e}function L(){var e=Object(l.a)(["\n            margin-right: 10px;\n        "]);return L=function(){return e},e}function A(){var e=Object(l.a)(["\n            float: left;\n            width: 40%;\n            @media screen and (max-width: 660px) {\n                width: 60%;\n            }\n        "]);return A=function(){return e},e}function F(){var e=Object(l.a)(["\n            display: flex;\n            @media screen and (max-width: 660px) {\n                {\n                    display: initial;\n                }\n        "]);return F=function(){return e},e}function J(){var e=Object(l.a)(["\n            position: absolute;\n            width: 60%;\n            min-width: 650px;\n            top: 5%;\n            left: 50%;\n            transform: translate(-50%, -3%);\n            padding: 10px 10px 15px 15px;\n            border: 2px solid black;\n            background-color: white;\n            font-family: monospace;\n            @media screen and (max-width: 720px) {\n                width: 90%;\n                min-width: 215px;\n            }\n            @media screen and (max-height: 340px) {\n                flex-direction: column;\n                overflow: scroll;\n                max-height: 95%;\n            }\n        "]);return J=function(){return e},e}function _(){var e=Object(l.a)(["{\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.3);\n            z-index: 1;\n            visibility: hidden;\n        "]);return _=function(){return e},e}var q=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=v.a.div.attrs({id:"graph_overlay"})(_()),t=v.a.div(J()),n=v.a.div(F()),a=v.a.div(A()),i=v.a.input.attrs({type:"date"})(L()),o=v.a.button.attrs({id:"closeButton"})(B());return r.a.createElement(e,null,r.a.createElement(t,null,r.a.createElement("canvas",{id:"canvas"}),r.a.createElement(n,null,r.a.createElement(a,null,"Start date: ",r.a.createElement(i,{id:"startDate"})),r.a.createElement(a,null,"End date: \xa0\xa0",r.a.createElement(i,{id:"endDate"})),r.a.createElement(o,null,"Close"))))}}],[{key:"createChartWindow",value:function(){var e=Object(s.a)(u.a.mark(function e(n,a){var r,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==a){e.next=2;break}return e.abrupt("return");case 2:return document.body.style.overflow="hidden",T.set(),e.next=6,S.getStockHistory(n,a);case 6:if(r=e.sent,T.unset(),200===r){e.next=11;break}return alert("Could not fetch stock history, please try again later"),e.abrupt("return");case 11:i=t.parseData(a),document.getElementById("graph_overlay").style.visibility="visible",t.createChart(i,a);case 15:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"parseData",value:function(e){var t=document.getElementById("startDate").value,n=document.getElementById("endDate").value;""===t&&(t=0),""===n&&(n=9);var a=[],r=[];e+="History";var i=JSON.parse(localStorage.getItem(e)).value;return Object.keys(i).sort().forEach(function(e){e.localeCompare(t)>0&&e.localeCompare(n)<0&&(r.push(i[e]["4. close"]),a.push(e))}),{dates:a,values:r}}},{key:"createChart",value:function(e,n){var a=document.getElementById("canvas");null!=this.perfChart&&this.perfChart.destroy();var r="Stock: "+n+"     Currency: USD";this.perfChart=new C.Chart(a,{type:"line",data:{labels:e.dates,datasets:[{label:r,data:e.values,borderColor:"rgba(255, 0, 0, 10)",borderWidth:1,cubicInterpolationMode:"monotone",pointRadius:0}]},options:{legend:{labels:{boxWidth:0}},scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}});var i=e.dates[0],o=e.dates[e.dates.length-1],l=document.getElementById("startDate"),c=document.getElementById("endDate"),u=document.getElementById("closeButton");l.value=i,l.min=i,l.max=o,c.value=o,c.min=i,c.max=o,l.addEventListener("change",function(e){t.redrawChart(n)}),c.addEventListener("change",function(e){t.redrawChart(n)}),u.addEventListener("click",function(e){localStorage.removeItem(n+"History"),t.closeChart()})}},{key:"redrawChart",value:function(e){var n=t.parseData(e);this.perfChart.data.labels=n.dates,this.perfChart.data.datasets[0].data=n.values,this.perfChart.update(0)}},{key:"closeChart",value:function(){document.getElementById("graph_overlay").style.visibility="hidden",document.body.style.overflow="auto"}}]),t}(a.Component);function z(){var e=Object(l.a)(["\n            height: 15px;\n            width: 30px;\n            border: 0;\n            padding: 0;\n            margin: 5px;\n            border-right: 15px solid darkred;\n            outline: none;\n            border-radius: 10px;\n            background-color: #BBB;\n            transform: rotate(","deg);\n             :hover {\n                border-color: firebrick;\n            }\n       "]);return z=function(){return e},e}function G(){var e=Object(l.a)(["\n            display: flex;\n            flex-direction: row;\n            justify-content: flex-end;\n            align-items: center;\n            flex-grow: 2;\n        "]);return G=function(){return e},e}function H(){var e=Object(l.a)(["\n            min-width: 46px;\n            margin-top: 5px;\n            ","\n            @media screen and (max-width: 446px) {\n                float: none;\n                margin-top: 2px;\n                margin-right: 0;\n                margin-left: 0px;\n            }\n        "]);return H=function(){return e},e}function Q(){var e=Object(l.a)(["\n            float: left;\n            width: 40%;\n            @media screen and (max-width: 446px) {\n                display: flex;\n                justify-content: flex-end;\n                width: 40%;\n            }\n        "]);return Q=function(){return e},e}function M(){var e=Object(l.a)(["\n            float: left;\n            width: 60%;\n            @media screen and (max-width: 446px) {\n                display: flex;\n                justify-content: space-between;\n                width: 60%;\n            }\n        "]);return M=function(){return e},e}function W(){var e=Object(l.a)(["\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        "]);return W=function(){return e},e}function Y(){var e=Object(l.a)(["\n            height: auto;\n            max-width: 648;\n            min-width: 198;\n            border-top: 1px solid black;\n            background-color: #DDA;\n            padding: 8px 5px 15px 15px;\n            @media screen and (max-width: 1024px) {\n                display: table-cell;\n                height: auto;\n            }\n            @media screen and (max-width: 446px) {\n                    padding: 2px 5px 6px 5px;\n            }\n            @media screen and (max-width: 379px) {\n                padding-bottom: 4px;\n            }\n        "]);return Y=function(){return e},e}function X(){var e=Object(l.a)(["\n            width: 20%;\n            float: left;\n            padding: 0;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            margin-top: 4px;\n        "]);return X=function(){return e},e}function Z(){var e=Object(l.a)(["\n            display: block;\n            background-color: #CCC;\n            :nth-child(even) {\n                display: block;\n                background-color: #AAA;\n            }\n        "]);return Z=function(){return e},e}function K(){var e=Object(l.a)(["\n            display: flex;\n            flex-direction: column;\n            overflow: auto;\n            width: 100%;\n            height: -webkit-fill-available;\n            max-height: 261px;\n            background: linear-gradient(\n                    to bottom,\n                    rgba(220, 220, 220, 0.3),\n                    rgba(240, 240, 240, 0.1) 80%,\n                    rgba(200, 200, 200, 0.3) 50%,\n                    rgba(220, 220, 220, 0.3) 50%\n            );\n            background-size: 1% 5px;        \n            @media screen and (max-height: 425px) {\n                max-height: calc(100vh - 164px);\n            }\n            @media screen and (max-height: 232px) {\n                max-height: 68px;\n            }\n        "]);return K=function(){return e},e}function $(){var e=Object(l.a)(["\n            display: flex;\n            background-color: #CCC;\n            min-height: 1.8em;\n            font-weight: normal;\n            border-bottom: 1px solid black;\n        "]);return $=function(){return e},e}function ee(){var e=Object(l.a)(["\n            display: block;\n        "]);return ee=function(){return e},e}function te(){var e=Object(l.a)(["\n            display: block;\n            text-align: center;\n        "]);return te=function(){return e},e}function ne(){var e=Object(l.a)(["\n            background-color: darkred;\n            color: white;\n            font-family: Corbel, monospace;\n            font-weight: bold;\n            width: 1.4em;\n            height: 1.3em;\n            border-bottom: 1px solid darkred;\n            cursor: default;\n            margin-left: 5px;\n            :hover {\n                background-color: firebrick;\n            }\n        "]);return ne=function(){return e},e}function ae(){var e=Object(l.a)(["\n            display: flex;\n            justify-content: flex-end;\n            flex-grow: 3.5;\n        "]);return ae=function(){return e},e}function re(){var e=Object(l.a)(["\n            background-color: #DDA;\n            display: flex;\n            min-height: 40px;\n            align-items: center;\n            padding: 10px;\n            border-bottom: 1px solid black;\n            text-align: center;        \n            @media screen and (max-width: 266px) {\n                    font-size: 10px;\n            }\n            @media screen and (max-height: 425px) {\n                    min-height: 46px;\n            }\n            "]);return re=function(){return e},e}function ie(){var e=Object(l.a)(["\n            display: flex;\n            flex-wrap: wrap;\n            width: calc(100vw - 40px);\n            float: left;\n            justify-content: center;\n            @media screen and (max-width: 1024px) {\n                flex-wrap: wrap;\n            }\n            "]);return ie=function(){return e},e}function oe(){var e=Object(l.a)(["\n            float: left;\n            display: flex;\n            flex-direction: column;\n            width: calc(50vw - 50px);\n            min-width: 200px;\n            max-width: 650px;\n            border: 1px solid black;\n            margin: 0 15px 20px;\n            :only-child {\n                width: calc(100vW - 50px);\n            }\n            @media screen and (max-width: 1024px) {\n                width: calc(100vw - 50px);\n            }\n        "]);return oe=function(){return e},e}var le=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).saveState=e.saveState,n.portfolios=e.portfolios,n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"addStock",value:function(){var e=Object(s.a)(u.a.mark(function e(t){var n,a,r,i,o,l,c,s,d;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=!1,!(t.entries.length>=50)){e.next=5;break}if(!1!==(i=window.confirm("The maximum number of stocks in the current portfolio has been reached. Do you wish to add shares to an existing stock?"))){e.next=5;break}return e.abrupt("return");case 5:if(o=prompt("Please enter stock symbol")){e.next=8;break}return e.abrupt("return");case 8:o=o.toUpperCase(),l=0;case 10:if(!(l<t.entries.length)){e.next=18;break}if(t.entries[l].symbol!==o){e.next=15;break}return n=!0,c=l,e.abrupt("break",18);case 15:l++,e.next=10;break;case 18:if(!i||n){e.next=21;break}return alert("The entered symbol does not exist in portfolio."),e.abrupt("return");case 21:s=!0,o in localStorage&&(s=!1,a=JSON.parse(localStorage.getItem(o)).value);case 23:if(a&&!isNaN(a)){e.next=37;break}if(null!==(a=prompt("Please enter value per share in "+t.currency+".\nLeave blank to fetch the current value from AlphaVantage."))){e.next=27;break}return e.abrupt("return");case 27:if(a<0&&(a="."),""!==a){e.next=35;break}return T.set(),e.next=32,S.getCurrentStockValue(this,o);case 32:d=e.sent,T.unset(),200===d?a=JSON.parse(localStorage.getItem(o)).value:(localStorage.removeItem(o),alert("Could not fetch stock value from server. Please try again or enter value manually."),a=".");case 35:e.next=23;break;case 37:if(!(!r||isNaN(r)||r%1!==0||r<0)){e.next=43;break}if(null!==(r=prompt("Please enter the number of shares to add."))){e.next=41;break}return e.abrupt("return");case 41:e.next=37;break;case 43:"EUR"===t.currency&&s&&(a=b.EtoD(a)),n?t.addStock(new E(o,a,r),c):t.addStock(new E(o,a,r)),this.saveState();case 46:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"removeStock",value:function(e){var t=prompt("Amount to remove");e.removeStock(e.selected,t),this.saveState()}},{key:"deletePortfolio",value:function(e){for(var t=0;t<this.portfolios.length;t++)null!==this.portfolios[t]&&this.portfolios[t].id===e&&window.confirm("Do you want to delete the portfolio "+this.portfolios[t].name+"?")&&this.portfolios.splice(t,1);this.saveState()}},{key:"createGraph",value:function(){var e=Object(s.a)(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.selected){e.next=2;break}return e.abrupt("return");case 2:n=t.entries[t.selected].symbol,q.createChartWindow(this,n);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=v.a.div(oe()),t=v.a.div(ie()),n=[],a=0;a<this.portfolios.length;a++)if(null!==this.portfolios[a]){var i=this.portfolios[a],o=this.deletePortfolio.bind(this,i.id),l="id"+i.id;n.push(r.a.createElement(e,null,r.a.createElement(ce,{currentPortfolio:i,uniqueID:l,deletePortfolio:o,saveState:this.saveState}),r.a.createElement(ue,{portfolio:i,self:this}),r.a.createElement(se,{currentPortfolio:i,addStock:this.addStock.bind(this,i),removeStock:this.removeStock.bind(this,i),createGraph:this.createGraph.bind(this,i)})))}return r.a.createElement(t,null,n)}}]),t}(a.Component),ce=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=v.a.div(re()),t=v.a.div(ae()),n=v.a.div(ne()),a=this.props.currentPortfolio;return r.a.createElement(e,null,r.a.createElement(t,null,a.name),r.a.createElement(de,{labelOff:"EUR",labelOn:"USD",onChange:a.changeCurrency.bind(a),saveState:this.props.saveState,on:"EUR"===a.currency}),r.a.createElement(n,{id:"button"+this.props.uniqueID,onClick:this.props.deletePortfolio},"x"))}}]),t}(a.Component),ue=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){for(var e=v.a.table(te()),t=v.a.thead(ee()),n=v.a.tr($()),a=v.a.tbody(K()),i=v.a.tr(Z()),o=v.a.td(X()),l=this.props.portfolio,c=l.entries,u=[],s=this.props.self,d=0;d<c.length;d++)if(null!=c[d]){var h=l.getCurrentValue(c[d]),p=l.getCurrentRate(c[d].totalValue);u.push(r.a.createElement(i,{onClick:function(e){l.selected=e,s.saveState()}.bind(s,d)},r.a.createElement(o,null,c[d].symbol),r.a.createElement(o,null,h," ",l.currency),r.a.createElement(o,null,c[d].amount),r.a.createElement(o,null,p," ",l.currency),r.a.createElement(o,null,r.a.createElement("input",{type:"radio",name:"selection"+l.id,checked:l.selected===d,readOnly:!0}))))}return r.a.createElement(e,null,r.a.createElement(t,null,r.a.createElement(n,null,r.a.createElement(o,null,"Name"),r.a.createElement(o,null,"Unit value"),r.a.createElement(o,null,"Quantity"),r.a.createElement(o,null,"Total value"),r.a.createElement(o,null,"Select"))),r.a.createElement(a,null,u))}}]),t}(a.Component),se=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.currentPortfolio,t=v.a.div(Y()),n=v.a.div(W()),a=v.a.div(M()),i=v.a.div(Q()),o=v.a.button(H(),function(e){return e.FloatRight?"float: right":null});return r.a.createElement(t,null,r.a.createElement(n,null,"Total value of portfolio : ",e.getCurrentRate(e.value)," ",e.currency),r.a.createElement(a,null,r.a.createElement(o,{onClick:this.props.addStock},"Add stock"),r.a.createElement(o,{onClick:this.props.createGraph},"Performance graph")),r.a.createElement(i,null,r.a.createElement(o,{FloatRight:!0,onClick:this.props.removeStock},"Remove selected")))}}]),t}(a.Component),de=function(e){function t(e){var n;return Object(d.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).state={on:n.props.on},n}return Object(m.a)(t,e),Object(h.a)(t,[{key:"flip",value:function(){this.setState({on:!this.state.on}),this.props.onChange(),this.props.saveState()}},{key:"render",value:function(){var e=180*this.state.on,t=v.a.div(G()),n=v.a.button(z(),e);return r.a.createElement(t,null,this.props.labelOff,r.a.createElement(n,{onClick:this.flip.bind(this)}),this.props.labelOn)}}]),t}(a.Component),he=function(){function e(t,n){Object(d.a)(this,e),this.id=t,this.name=""!==n?n:"Portfolio #"+t,this.entries=[],this.selected="",this.value=0,this.currency="EUR",this.addStock=this.addStock.bind(this),this.removeStock=this.removeStock.bind(this)}return Object(h.a)(e,[{key:"addStock",value:function(){var e=arguments.length<=0?void 0:arguments[0];switch(arguments.length){case 1:var t=this.entries.length,n=0;break;case 2:t=arguments.length<=1?void 0:arguments[1],n=1,e.amount=parseInt(e.amount)+parseInt(this.entries[t].amount),e.totalValue=e.getTotalValue();break;default:return}this.entries.splice(t,n,arguments.length<=0?void 0:arguments[0]),this.calculateValue()}},{key:"getValue",value:function(){return"USD"===this.currency?this.value:b.DtoE(this.value)}},{key:"changeCurrency",value:function(){this.currency="EUR"===this.currency?"USD":"EUR"}},{key:"getCurrentRate",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return parseFloat("USD"===this.currency?e:b.DtoE(e)).toFixed(2)}},{key:"getCurrentValue",value:function(e){return e.symbol in localStorage&&(e.setValue(JSON.parse(localStorage.getItem(e.symbol)).value),this.calculateValue()),parseFloat("USD"===this.currency?e.value:b.DtoE(e.value)).toFixed(2)}},{key:"removeStock",value:function(e,t){if(void 0!==e&&null!==t){var n=this.entries[e];if(null!==n){if(t>n.amount){if(!confirm("You are trying to remove more shares than there are in the selected stock. Do you want to remove all "+n.amount+" shares and delete the entry?"))return;t=n.amount}if(n.amount===t)return this.value-=n.totalValue,this.entries.splice(e,1),void(this.selected="");n.amount-=t,n.totalValue=n.value*n.amount,this.value-=n.value*t}}}},{key:"calculateValue",value:function(){for(var e=0,t=0;t<this.entries.length;t++)e+=parseFloat(this.entries[t].getTotalValue());this.value=e}}]),e}();function pe(){var e=Object(l.a)(["\n            width: 100%;\n            margin-top: 30px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n        "]);return pe=function(){return e},e}var fe=function(e){function t(){var e;if(Object(d.a)(this,t),(e=Object(p.a)(this,Object(f.a)(t).call(this))).portfolios=[],e.counter=0,e.updateForex(),"portfolios"in localStorage){for(var n=JSON.parse(localStorage.getItem("portfolios")),a=0;a<n.length;a++){var r=n[a];if(null!==r){for(var i=new he(r.id,r.name),o=0;o<r.entries.length;o++){var l=r.entries[o];i.addStock(new E(l.symbol,l.value,l.amount,l.updated))}i.selected=r.selected,i.currency=r.currency,e.portfolios.push(i),e.counter<r.id&&(e.counter=r.id)}}e.counter+=1}return e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"saveState",value:function(){localStorage.setItem("portfolios",JSON.stringify(this.portfolios)),this.setState({})}},{key:"addPortfolio",value:function(){if(this.portfolios.length>=10)alert("The maximum number of portfolios has been reached.\nPlease delete an existing portfolio before creating a new one.");else{var e=prompt("Please enter a name for the new portfolio.");void 0!=e&&(this.portfolios.push(new he(this.counter,e)),this.counter+=1,this.saveState())}}},{key:"updateValues",value:function(){var e=this;this.portfolios.forEach(function(){var t=Object(s.a)(u.a.mark(function t(n){var a,r,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!("requestLimit"in sessionStorage&&sessionStorage.getItem("requestLimit")>Date.now()-61e3)){t.next=3;break}return alert("The maximum number of requests per minute has been reached, please wait a moment and try again."),t.abrupt("return");case 3:a=0,r=0;case 5:if(!(r<n.entries.length)){t.next=16;break}return t.next=8,S.getCurrentStockValue(e,n.entries[r].symbol);case 8:if(200===(i=t.sent)){t.next=12;break}return alert("Status "+i+": Could not fetch all stock values, please try again later."),t.abrupt("return",i);case 12:a+=n.entries[r].totalValue;case 13:r++,t.next=5;break;case 16:n.value=a,e.saveState();case 18:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())}},{key:"updateForex",value:function(){S.getCurrentForex(this)}},{key:"render",value:function(){var e=v.a.div(pe());return r.a.createElement(e,null,r.a.createElement(w,{caller:this}),r.a.createElement(le,{portfolios:this.portfolios,saveState:this.saveState.bind(this)}))}}]),t}(a.Component),me=[r.a.createElement(fe,null),r.a.createElement(T,null),r.a.createElement(q,null)];o.a.render(me,document.getElementById("root"))}},[[36,2,1]]]);
//# sourceMappingURL=main.3700cadc.chunk.js.map