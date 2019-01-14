(function ($) {
	function setLoinDiv(DIV, Summary) {
		var lableSymbolS = "{{", lableSymbolE = "}}";
		var attrValAdd = {
			AvmVFor: "m-for",
			AvmVShow: "m-show"
		};
		// -----------------onload--------------------------
		// 用来加载load执行的方法或是ajax
		var LoadFlage = false,timer;
		setTime();
		var proBodys = DIV.html();
		DIV.children().remove();
		
		// 设置加载load的dom
		function setTime() {
			timer = setInterval(function () {
				if (LoadFlage) {
					DIV.append(proBodys);
					setLoop(DIV.children());
					clearInterval(timer);
				} else {
					setLoad()
				}
			}, 100)
		}
		
		// 预先加载的dom
		function setLoad() {
			for (var keyLoad in Summary.loads) {
				new Summary.loads[keyLoad]
			}
			LoadFlage = true;
		}
		
		// createHTML-->v-for-->loop
		function setLoop(FSomes) {
			var FSomess = FSomes.parent(),FSome = FSomes,FLength = 0,FLsize = true;
			for (var i = 0; i < FSome.length; i++) {
				if (FSome.eq(i).attr(attrValAdd.AvmVFor)) {
					if (FLsize) {
						FLsize = false;
						FLength = i;
					}
					var StringVFor = FSome.eq(i).attr(attrValAdd.AvmVFor);
					var vForS = StringVFor.substring(0, StringVFor.indexOf("in") - 1);
					var vForE = StringVFor.substring(StringVFor.indexOf("in") + 3, StringVFor.length);
					FSome.eq(i).removeAttr(attrValAdd.AvmVFor);
					var itemsWillDelF = {
						item: FSome.eq(i),
						tagName: FSome.eq(i)[0].tagName,
						html: FSome.eq(i).html()
					};
					for (var key in Summary.data) {
						if (key == vForE) {
							for (var j = 0; j < Summary.data[key].length; j++) {
								var FSLable = {
									Lables: itemsWillDelF.tagName,
									LablesAttr: setAttrR(itemsWillDelF.item),
									Html: itemsWillDelF.html
								};
								var itmesDivF = FSomess.children().eq(FLength + j).after("<" + FSLable.Lables + FSLable.LablesAttr + ">" + FSLable.Html + "</" + FSLable.Lables + ">");
								setMessage(itmesDivF, Summary.data[key][j], vForS, j);
								setEvent(itmesDivF.parent().children().eq(FLength + j));
							}
							FSomess.children().eq(FLength + Summary.data[key].length).remove();
							FLength += Summary.data[key].length;
						}
					}
				} else {
					setEvent(FSome.eq(i));
					setMessage(FSome.eq(i));
				}
				if (FSome.eq(i).children().length != 0) {
					var sonSome = FSome.eq(i).children(),FLengths = 0,FLsizes = true;
					for (var m = 0; m < sonSome.length; m++) {
						if (sonSome.eq(m).attr(attrValAdd.AvmVFor)) {
							if (FLsizes) {
								FLsizes = false;
								FLengths = m;
							}
							var StringVForS = sonSome.eq(m).attr(attrValAdd.AvmVFor);
							var vForSs = StringVForS.substring(0, StringVForS.indexOf("in") - 1);
							var vForEs = StringVForS.substring(StringVForS.indexOf("in") + 3, StringVForS.length);
							sonSome.eq(m).removeAttr(attrValAdd.AvmVFor);
							var itemsWillDel = {
								item: sonSome.eq(m),
								tagName: sonSome.eq(m)[0].tagName,
								html: sonSome.eq(m).html()
							};
							for (var key in Summary.data) {
								if (key == vForEs) {
									for (var h = 0; h < Summary.data[key].length; h++) {
										var SSLable = {
											Lables: itemsWillDel.tagName,
											LablesAttr: setAttrR(itemsWillDel.item),
											Html: itemsWillDel.html
										};
										var itmesDiv = FSome.eq(i).children().eq(FLengths + h).after("<" + SSLable.Lables + SSLable.LablesAttr + ">" + SSLable.Html + "</" + SSLable.Lables + ">");
										setMessage(itmesDiv, Summary.data[key][h], vForSs, h)
									}
									FSome.eq(i).children().eq(FLengths + Summary.data[key].length).remove();
									FLengths += Summary.data[key].length;
								}
							}
						} else {
							setEvent(sonSome.eq(m))
							setMessage(sonSome.eq(m));
						}
						if (sonSome.eq(m).children().length != 0) {
							setLoop(sonSome);
						}
					}
				}
			}
		}
		
		// get/set the Label attribute
		function setAttrR(AttrDiv) {
			var AttrsVal = {
				AttVal: AttrDiv[0].attributes,
				AddArr: []
			};
			for (var key in AttrsVal.AttVal) {
				if (!isNaN(parseInt(key))) {
					AttrsVal.AddArr.push(AttrsVal.AttVal[key])
				}
			}
			var AttrValS = '';
			for (var key in AttrsVal.AddArr) {
				var setValue = AttrsVal.AddArr[key].value;
				var setAttrName = AttrsVal.AddArr[key].name;
				AttrValS += " " + setAttrName + "='" + setValue + "'";
			}
			return AttrValS
		}
		
		// set Event
		function setEvent(Dobj) {
			var EventS = {
				click: ":click",
				mouseenter: ":mouseenter",
				mouseover: ":mouseover",
				mouseup: ":mouseup",
				mousedown: ":mousedown",
				mousemove: ":mousemove"
			};
			for (var keyEvet in EventS) {
				if (Dobj.attr(EventS[keyEvet])) {
					var clickVal = Dobj.attr(EventS[keyEvet]);
					var cellS = clickVal.substring(clickVal.indexOf("(") + 1, clickVal.indexOf(")"));
					clickVal = clickVal.replace("(" + cellS + ")", "");
					Dobj.on(keyEvet, function () {
						if (cellS == '') {
							new Summary.method[clickVal](Dobj);
						} else {
							new Summary.method[clickVal](cellS, Dobj);
						}
					})
				}
			}
		}
		
		// RegExp-->html
		function setReg(stringVal, regVal, endVal) {
			var reg = new RegExp(regVal, "gim");
			return stringVal.replace(reg, endVal)
		}
		
		//set-Message-information
		function setMessage(itemsDiv, itemsDivHtml, selectVal, ide) {
			var getHtmlV = itemsDiv.html();
			if (getHtmlV.indexOf(lableSymbolS) != "-1") {
				// AVM中的Array
				// AVM中字符串、数组
				for (var keyE in Summary.data) {
					getHtmlV = itemsDiv.html();
					if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == keyE) {
						if (typeof Summary.data[keyE] == "string" || typeof Summary.data[keyE] == "number") {
							var ObjString = Summary.data[keyE].toString();
							var regVal = lableSymbolS + keyE + lableSymbolE;
							itemsDiv.html(setReg(getHtmlV, regVal, ObjString));
						}
					}
					if (typeof Summary.data[keyE] == "object") {
						if (Array.isArray(Summary.data[keyE])) {
							// 数组中的json对象
							if (typeof Summary.data[keyE][ide] == "object") {
								// 循环数组里的json对象
								for (var keyJsons in Summary.data[keyE][ide]) {
									if (itemsDivHtml && selectVal) {
										var setJsonNames = selectVal + "." + keyJsons;
										getHtmlV = itemsDiv.html();
										if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == setJsonNames) {
											var ObjStrings = Summary.data[keyE][ide][keyJsons].toString();
											var regVal = lableSymbolS + setJsonNames + lableSymbolE;
											itemsDiv.html(setReg(getHtmlV, regVal, ObjStrings));
										}
									}
								}
							} else {
								// if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == selectVal) {
								var regVal = lableSymbolS + selectVal + lableSymbolE;
								itemsDiv.html(setReg(getHtmlV, regVal, itemsDivHtml));
								// }
							}
						} else {
							for (var keyJson in Summary.data[keyE]) {
								var setJsonName = keyE + "." + keyJson;
								if (getHtmlV.substring(getHtmlV.indexOf(lableSymbolS) + 2, getHtmlV.indexOf(lableSymbolE)) == setJsonName) {
									var ObjString = Summary.data[keyE][keyJson].toString();   //json一级对象
									var regVal = lableSymbolS + setJsonName + lableSymbolE;
									itemsDiv.html(setReg(getHtmlV, regVal, ObjString));
								}
							}
						}
					}
				}
			}
		}
	}
	
	// ---------------------------functionEnd---------------------------------------------
	$.fn.AVM = function (Svals) {
		var Summary = $.extend({
			data: {},
			loads: {},
			method: {}
		}, Svals);
		setLoinDiv(this, Summary);
	}
})(jQuery);