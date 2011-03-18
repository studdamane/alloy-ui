AUI.add("aui-textboxlist",function(q){var d=q.Lang,h=q.ClassNameManager.getClassName,b="textboxlistentry",g="textboxlist",y="boundingBox",n="contentBox",B={from:{opacity:1},to:{opacity:0.3},duration:0.1,on:{end:function(D){var A=this;var C=A.get("reverse");if(!C){A.run();}A.set("reverse",!C);}}},i=h("helper","clearfix"),l=h("icon"),w=h("icon","close"),r=h(b,"close","hover"),o=h(b,"close"),s=h(b,"holder"),v=h(b,"text"),a=h(b,"item"),u=h(g,"input","container"),x="BACKSPACE",j="ENTER",m="LEFT",k="RIGHT",f='<span class="'+[l,w,o].join(" ")+'"></span>',p='<span class="'+v+'"></span>',e='<ul class="'+[i,s].join(" ")+'"></ul>',z='<li class="'+u+'"></li>';var t=q.Component.create({NAME:g,ATTRS:{allowAnyEntry:{value:false},delimChar:{value:""},tabIndex:{value:0}},EXTENDS:q.AutoComplete,prototype:{initializer:function(C){var A=this;var D=A.get("matchKey");A.entries=new q.DataSet({getKey:function(F){var E=this;return F[D];}});A._lastSelectedEntry=-1;},renderUI:function(){var A=this;A._renderEntryHolder();t.superclass.renderUI.apply(A,arguments);A._overlayAlign.node=A.get(y);},bindUI:function(){var D=this;t.superclass.bindUI.apply(D,arguments);D.after("itemSelect",D._afterItemSelect);D.after("focusedChange",D._afterTBLFocusedChange);D.on("click",D._onBoundingBoxClick);var C=D.entries;var E=D.entryHolder;var A="."+w;C.after("add",D._updateEntryHolder,D);C.after("replace",D._updateEntryHolder,D);C.after("remove",D._updateEntryHolder,D);E.delegate("click",q.bind(D._removeItem,D),A);E.delegate("mouseenter",q.bind(D._onCloseIconMouseOver,D),A);E.delegate("mouseleave",q.bind(D._onCloseIconMouseOut,D),A);q.on("key",D._onTBLKeypress,D.get(y),"down:39,40,37,38,8,13",D);D.inputNode.on("focus",D._onInputNodeFocus,D);},add:function(C){var A=this;var D=A._prepareEntry(C);A.entries.add(D);},addEntries:function(A){var A=this;var C=A.inputNode;A.entries.add(C.val(),{});},insert:function(D,C){var A=this;var E=A._prepareEntry(C);return A.entries.insert(D,E);},remove:function(C){var A=this;return A.entries.removeKey(C);},_afterItemSelect:function(C){var A=this;A.entries.add(C._resultData);},_afterTBLFocusedChange:function(D){var A=this;if(D.type.indexOf("textboxlistentry")>-1){if(D.newVal){var C=D.target.get(y);A._lastSelectedEntry=A.entryHolder.all("li").indexOf(C);}}},_onBoundingBoxClick:function(C){var A=this;A.inputNode.focus();},_onCloseIconMouseOut:function(C){var A=this;C.currentTarget.removeClass(r);},_onCloseIconMouseOver:function(C){var A=this;C.currentTarget.addClass(r);},_onInputNodeFocus:function(C){var A=this;A._lastSelectedEntry=-1;},_onTBLKeypress:function(C){var N=this;var K=N.inputNode;if(!K.val()){var M=N._lastSelectedEntry;var D=-1;var E=(M==-1);var F=C.isKey(x);var H=(F&&E);var I=C.isKey(m)||H;var A=C.isKey(k);var G=N.entries;var L=G.size();var J=L-1;if(I){if(E){D=J;}else{if(M==0){D=M;}else{D=M-1;}}}else{if(A){if(E||(M==J)){D=-1;}else{D=M+1;}}else{if(F){G.removeAt(M);L=G.size();if(M==L){D=-1;}else{D=M;}}}}if(H||F){C.halt();}if(D!=-1){G.item(D).entry.focus();}else{K.focus();}N._lastSelectedEntry=D;}else{if(C.isKey(j)&&N.get("allowAnyEntry")){N.addEntries();}}},_onTextboxKeyPress:function(C){var A=this;t.superclass._onTextboxKeyPress.apply(A,arguments);if(C.isKey(j)){C.halt();}},_prepareEntry:function(C){var A=this;var E={};var D=A.get("matchKey");E[D]=C;return E;},_realignContainer:function(C){var A=this;A.overlay.set("width",A.get(y).get("offsetWidth"));t.superclass._realignContainer.apply(A,arguments);},_removeItem:function(E){var A=this;var D=q.Widget.getByNode(E.currentTarget);D=D.get(y);var C=A.entryHolder.all("li").indexOf(D);A.entries.removeAt(C);},_renderEntryHolder:function(){var A=this;var C=A.get(n);var D=q.Node.create(e);C.prepend(D);A.entryHolder=D;},_renderInput:function(){var C=this;var E=C.get(n);var F=C.get("input");var G={labelText:false};var A=null;if(F){F=q.one(F);G.node=F;A=F.get("parentNode");}var I=q.Node.create(z);C.entryHolder.append(I);var D=new q.Textfield(G).render(I);var H=D.get(y);if(H.get("parentNode")!=I){I.appendChild(H);}C.inputContainer=I;C.inputField=D;C.inputNode=D.get("node");C.button=new q.ButtonItem();C.set("uniqueName",q.stamp(C.inputNode));},_updateEntryHolder:function(C){var K=this;var D=C.type;var G=K.inputNode;var A=K.entryHolder;var M=C.item;var F=C.index;var L=K.get("matchKey");var J=M[L]||C.attrName;if(J){if(D=="dataset:add"){var H=new c({labelText:J});H.addTarget(K);var I=H.get(y);H.render(A);A.all("li").item(F).placeBefore(I);I.plug(q.Plugin.NodeFX,B);M.entry=H;G.val("");}else{if(D=="dataset:replace"){G.val("");var H=C.prevVal.entry;M.entry=H;H.get(y).fx.run();}else{if(D=="dataset:remove"){var E=A.all("li");if(E){E.item(F).remove();}}}}}else{K.entries.removeAt(F);}}}});var c=q.Component.create({NAME:b,ATTRS:{labelText:{value:""},tabIndex:{value:0}},prototype:{BOUNDING_TEMPLATE:"<li></li>",CONTENT_TEMPLATE:"<span></span>",renderUI:function(){var A=this;var C=A.get(n);var F=q.Node.create(p);var E=q.Node.create(f);var D=A.get("labelText");F.set("innerHTML",D);C.appendChild(F);C.appendChild(E);}}});q.TextboxList=t;q.TextboxListEntry=c;},"@VERSION@",{requires:["anim-node-plugin","aui-autocomplete","node-focusmanager"],skinnable:true});