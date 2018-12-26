var DW = document.documentElement.clientWidth;
var DH = document.documentElement.clientHeight;
var popLable = '<div class="pop"><div class="popCon"><div class="popMain"><div class="popHead"><i>标题</i><span class="closePop closeSpan">&times;</span></div><div class="popBody">内容</div><div class="popFoot"><span class="popSpan"><button class="kui-btn kui-primary closeSubmit">确定</button></span><span class="popSpan"><button class="kui-btn kui-info closePop">取消</button></span></div></div></div></div>';
var tipsLable = '<div class="Tips kui-border-radius3">操作成功</div>';

// 构造函数
function Kui() {
	// 样式
	this.load()
}

// 变量
Kui.prototype.Vars = {
	popConWidth: 300,
	popConHeight: 160,
	TabLi: "",
	TabSize: null,
	PanelLi: "",
	PanelSize: null,
	SliderSize: {
		SilderPro: "20%",
		SilderType: "infor"
	},
	PageItems: "",
	PageSize: {
		pageStart: 1,
		pageSum: 20,
		pageNumber: 6,
		pageIndex: function () {
		}
	},
	ProgessSize: ""
};
Kui.prototype.load = function () {
	$(function () {
		// 事件样式
		$(".kui-anim-scale").click(function () {
			var scaleWidth = $(".kui-anim-scale").width();
			var scaleHeight = $(".kui-anim-scale").height();
			$(".kui-anim-scale").css({
				"width": "0",
				"height": "0",
				"marginTop": scaleHeight / 2,
				"marginLeft": scaleWidth / 2
			});
			$(".kui-anim-scale").animate({
				"width": scaleWidth,
				"height": scaleHeight,
				"margin": "0"
			}, 250)
		});
		$(".kui-anim-fade").click(function () {
			$(".kui-anim-fade").hide();
			$(".kui-anim-fade").fadeIn()
		});
		$(".kui-anim-down").click(function () {
			$(".kui-anim-down").hide();
			$(".kui-anim-down").slideDown()
		});
		// 选项卡
		$(".pop").height(DH);
		$(".popCon").css({
			"top": (DH - $(".popCon").height()) / 2 - 50 + "px",
			"left": (DW - $(".popCon").width()) / 2 + "px",
		});
		$(".kuiTab-header").append("<ul></ul>");
		$(".kuiTab-header ul").append(Kui.Vars.TabLi);
		$(".kuiTab-body .kuiTab-items").eq(0).show();
		$(".kuiTab-header ul li").eq(0).addClass("kuiTabActive");
		$(".kuiTab-header ul li").each(function (index) {
			$(this).click(function () {
				$(this).addClass("kuiTabActive").siblings().removeClass("kuiTabActive");
				$(".kuiTab-body .kuiTab-items").eq(index).show().siblings().hide()
			})
		});
		// 折叠面板
		$(".panel").append("<ul></ul>");
		$(".panel ul").append(Kui.Vars.PanelLi);
		$(".panel ul li").eq(0).find(".panelCon").show();
		$(".panel ul li").eq(0).find("h3").addClass("panelConActive");
		$(".panel ul li").each(function (index) {
			var that = $(this);
			$(this).find("h3").click(function () {
				$(".panel ul li").not($(that)).find("h3").removeClass("panelConActive");
				$(".panel ul li").not($(that)).find(".panelCon").slideUp(100);
				$(this).addClass("panelConActive");
				$(that).find(".panelCon").slideDown(100)
			})
		});
		//滑块
		var setSilderDiv = '<div class="sliderBefore"></div><div class="sliderBox"></div>';
		$(".slider").append(setSilderDiv);
		var slideLV = $(".sliderBox").width() / 2;
		$(".sliderBefore").addClass("kui-" + Kui.Vars.SliderSize.SilderType);
		$(".sliderBefore").width(Kui.Vars.SliderSize.SilderPro);
		$(".sliderBox").addClass("slider-" + Kui.Vars.SliderSize.SilderType + "-border");
		$(".sliderBox").css({
			"left": $(".sliderBefore").width() - 10 + "px"
		});
		$(".sliderBox").bind("mousedown", function (evtD) {
			var that = $(this);
			var evtDX = evtD.clientX;
			if (evtDX <= $(".slider").offset().left + $(".slider").width() && evtDX >= $(".slider").offset().left) {
				setSilderPro(that, $(that).siblings('.sliderBefore'));
			}
		});
		$(".slider").bind("mousedown", function (evtD) {
			var that = $(this);
			var evtDX = evtD.clientX;
			if (evtDX <= $(".slider").offset().left + $(".slider").width() && evtDX >= $(".slider").offset().left) {
				$(that).find(".sliderBox").css({
					"left": evtDX - $(that).find('.sliderBefore').offset().left - slideLV + "px"
				});
				$(that).find('.sliderBefore').css({
					width: evtDX - $(that).find('.sliderBefore').offset().left + "px"
				});
				setSilderPro($(that).find(".sliderBox"), $(that).find('.sliderBefore'))
			}
		});
		
		function setSilderPro(that, thatDiv) {
			$(document).bind("mousemove", function (evtM) {
				var evtMX = evtM.clientX;
				$(that).css({
					"left": evtMX - thatDiv.offset().left - slideLV + "px"
				});
				thatDiv.css({
					width: evtMX - thatDiv.offset().left + "px"
				});
				if (evtMX >= $(".slider").offset().left + $(".slider").width() || evtMX <= $(".slider").offset().left) {
					$(document).unbind('mousemove');
				}
			});
			$(document).mouseup(function () {
				$(document).unbind('mousemove');
			});
		}
		
		// 分页
		var pageLable = '<button class="pageFirst">首页</button><button class="pageP">上一页</button><div class="pageCon">' + Kui.Vars.PageItems + '</div><button class="pageN">下一页</button><button class="pageLast">尾页</button>';
		$(".page").append(pageLable);
		if (Kui.Vars.PageSize.pageSum > Kui.Vars.PageSize.pageNumber) {
			$(".pageEI").show()
		} else {
			$(".pageEI").hide()
		}
		var IndexVal = null;
		$(".pageCon span").eq(Kui.Vars.PageSize.pageStart - 1).addClass("pageActive");
		$(".pageCon span").each(function (index) {
			$(this).click(function () {
				IndexVal = parseInt($(this).html());
				Kui.Vars.PageSize.pageIndex(IndexVal);
				setPageloop()
			})
		});
		$(".pageFirst").click(function () {
			IndexVal = 1;
			Kui.Vars.PageSize.pageIndex(1);
			setPageloop();
		});
		$(".pageLast").click(function () {
			IndexVal = Kui.Vars.PageSize.pageSum;
			Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
			setPageloop();
		});
		$(".pageP").click(function () {
			if (IndexVal > 1) {
				IndexVal--;
				Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
				setPageloop();
			}
		});
		$(".pageN").click(function () {
			if (IndexVal < Kui.Vars.PageSize.pageSum) {
				IndexVal++;
				Kui.Vars.PageSize.pageIndex(Kui.Vars.PageSize.pageSum);
				setPageloop();
			}
		});
		
		function setPageloop() {
			if ((Kui.Vars.PageSize.pageNumber + 1) / 2 >= IndexVal) {
				$(".pageFI").hide();
				$(".pageEI").show();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(j + 1)
				}
				$(".pageCon span").eq(IndexVal - 1).addClass("pageActive").siblings().removeClass("pageActive");
			} else if ((Kui.Vars.PageSize.pageNumber + 1) / 2 < IndexVal && (Kui.Vars.PageSize.pageSum - (Kui.Vars.PageSize.pageNumber + 1) / 2) >= IndexVal) {
				$(".pageFI").show();
				$(".pageEI").show();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(IndexVal - 3 + j)
				}
				if ((Kui.Vars.PageSize.pageNumber + 1) / 2 < IndexVal) {
					$(".pageCon span").eq((Kui.Vars.PageSize.pageNumber - 1) / 2).addClass("pageActive").siblings().removeClass("pageActive");
				}
			} else {
				$(".pageFI").show();
				$(".pageEI").hide();
				for (var j = 1; j < Kui.Vars.PageSize.pageNumber - 1; j++) {
					$(".pageCon span").eq(j).html(Kui.Vars.PageSize.pageSum - (Kui.Vars.PageSize.pageNumber - 1) + j)
				}
				$(".pageCon span").eq(Kui.Vars.PageSize.pageNumber - (Kui.Vars.PageSize.pageSum - IndexVal) - 1).addClass("pageActive").siblings().removeClass("pageActive");
			}
		}
		
		// 进度条
		var progessHtml = '<div class="progress-bar"></div><div class="progess-num"><span>20%</span><p></p></div>';
		$(".progress").append(progessHtml);
		$(".progress-bar").width(Kui.Vars.ProgessSize);
		$(".progess-num").css({
			"left": $(".progress-bar").width() - $(".progess-num").width() / 2 + "px"
		});
		$(".progess-num").find("span").text(Kui.Vars.ProgessSize);
		$(window).resize(function () {
			$(".progess-num").css({
				"left": $(".progress-bar").width() - $(".progess-num").width() / 2 + "px"
			});
			$(".progess-num").find("span").text(Kui.Vars.ProgessSize)
		});
		// 表情
		var EmojiHtml = '<div class="Expression"><i class="EmojiI"></i><div class="EmojiTitle"><i>表情</i><span>&times;</span></div><ul class="EmojiFace"></ul></div>';
		var setLengthEmoji = 52;
		
		
		$(".EmojiLog").click(function () {
			$(".Emoji").append(EmojiHtml);
			for (var i = 1; i <= setLengthEmoji; i++) {
				$(".EmojiFace").append("<li><img src='Emoji/img/" + i + ".png'></li>")
			}
			$("#EmojiVal").focus();
		});
		$(".Expression").css({
			"left": $(".EmojiLog").position().left - 17 + 'px',
			"top": $(".EmojiLog").position().top + 32 + 'px'
		});
		$(".EmojiTitle").find("span").click(function () {
			$(".Expression").hide()
		});
		$(".EmojiFace li").each(function () {
			$(this).click(function () {
				$("#EmojiVal").focus();
				var FaceImg = $(this).find("img").attr("src");
				var FaceImgVal = "<img src=" + FaceImg + ">";
				insertHtmlAtCaret(FaceImgVal);
			})
		});
	})
};


function insertHtmlAtCaret(html) {
	var sel, range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
}

Kui.prototype.open = function (valMsg) {
	var valMsgS = $.extend({
		title: "标题",
		text: "",
		message: "asdf"
	}, valMsg);
	$("body").append(popLable);
	$(".openPop").click(function () {
		$(".popHead i").text(valMsgS.title);
		if (valMsgS.text != "") {
			$(".popBody").text(valMsgS.text);
		} else {
			$(".popBody").html(valMsgS.message);
		}
		$(".pop").show();
		$(".popMain").hide();
		$(".popCon").css({
			"width": "0",
			"height": "0",
			"top": DH / 2 - 50 + "px",
			"left": DW / 2 + "px",
		});
		$(".popCon").animate({
			"width": Kui.Vars.popConWidth,
			"height": Kui.Vars.popConHeight,
			"top": (DH - Kui.Vars.popConHeight) / 2 - 50 + "px",
			"left": (DW - Kui.Vars.popConWidth) / 2 + "px",
		}, 100, function () {
			$(".popMain").show();
		});
	});
	Kui.close()
};
Kui.prototype.close = function () {
	$(".closePop").click(function () {
		closeDiv($(".closePop"))
	});
	$(".closeSubmit").click(function () {
		closeDiv($(".closeSubmit"));
	})
};

function closeDiv() {
	$(".popMain").hide();
	$(".popCon").animate({
		"width": 0,
		"height": 0,
		"top": DH / 2 - 50 + "px",
		"left": DW / 2 + "px",
	}, 100);
	$(".pop").fadeOut(100);
};
Kui.prototype.promptBox = function (valMsg) {
	var valMsgP = $.extend({
		TipsType: "success",
		TipsMsg: "操作成功"
	}, valMsg)
	$("body").append(tipsLable);
	var setType = "Tips-" + valMsgP.TipsType;
	$(".Tips").addClass(setType);
	$(".Tips").html(valMsgP.TipsMsg);
	$(".Tips").css({
		"top": (DH - $(".Tips").height()) / 2 - 100 + "px",
		"left": (DW - $(".Tips").width()) / 2 + "px",
	});
	$(".Tips").fadeIn(300);
	setTimeout(function () {
		$(".Tips").fadeOut(300, function () {
			$(".Tips").remove()
		});
	}, 2000)
};
Kui.prototype.kuiTab = function (TabVal) {
	Kui.Vars.TabSize = $.extend(["商品1", "商品2", "商品3"], TabVal)
	for (var i = 0; i < Kui.Vars.TabSize.length; i++) {
		Kui.Vars.TabLi += "<li>" + Kui.Vars.TabSize[i] + "</li>"
	}
};
Kui.prototype.Panel = function (PanelVal) {
	Kui.Vars.PanelSize = $.extend([
		{id: 0, title: "标题", message: "山东省济南市"},
		{id: 1, title: "标题", message: "山东省济南市"},
		{id: 2, title: "标题", message: "山东省济南市"}
	], PanelVal)
	for (var i = 0; i < Kui.Vars.PanelSize.length; i++) {
		Kui.Vars.PanelLi += "<li><h3>" + Kui.Vars.PanelSize[i].title + "</h3><div class='panelCon'>" + Kui.Vars.PanelSize[i].message + "</div></li>"
	}
};
Kui.prototype.Slider = function (SliderVal) {
	Kui.Vars.SliderSize = $.extend({
		SilderPro: "20%",
		SilderType: "infor"
	}, SliderVal)
};
Kui.prototype.Page = function (pageVal) {
	Kui.Vars.PageSize = $.extend({
		pageStart: 1,
		pageSum: 10,
		pageNumber: 6,
		pageIndex: function () {
		}
	}, pageVal);
	Kui.Vars.PageItems = '<span>1</span><i class="pageFI">...</i>';
	if (Kui.Vars.PageSize.pageSum <= Kui.Vars.PageSize.pageNumber) {
		for (var i = 2; i < Kui.Vars.PageSize.pageSum; i++) {
			Kui.Vars.PageItems += "<span>" + i + "</span>";
		}
	} else {
		for (var i = 2; i < Kui.Vars.PageSize.pageNumber; i++) {
			Kui.Vars.PageItems += "<span>" + i + "</span>";
		}
	}
	Kui.Vars.PageItems += '<i class="pageEI">...</i><span>' + Kui.Vars.PageSize.pageSum + '</span>';
};
Kui.prototype.Progess = function (ProgessVal) {
	Kui.Vars.ProgessSize = ProgessVal;
};
Kui.prototype.Emoji = function () {

};


var Kui = new Kui();
