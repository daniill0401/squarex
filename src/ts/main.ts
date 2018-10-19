
import * as $ from 'jquery';

class Slider{

	arrows: any;
	slides: any;
	dots: any;
	index: number;
	length: number;
	constructor(){
		this.arrows = $(".cycle .slider .arrow");
		this.dots = $(".cycle .slider .dot");
		this.slides = $(".cycle .slider .main__block");
		this.index = 0;
		this.length = this.slides.length;
		this.listen();
	}
	listen(){
		// this.arrows.on("click", this.arrowClicked);
		this.arrows.on("click", (e) => this.arrowClicked(e));
		this.dots.on("click", (e) => this.dotClicked(e));
	}
	turn(to){
		let active = $(this.slides[this.index]);
		let next = $(this.slides[to]);
		next.css("display", "none").addClass("active");
		active.fadeOut(300, () =>{
			this.dots.removeClass("active");
			$(this.dots[to]).addClass("active");
			next.fadeIn();
			active.removeClass("active");
		});
		this.index = to;
	}
	dotClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let next = parseInt($(t).attr("data-index"));
		this.turn(next);
	}
	arrowClicked(e) {
		let t = e.currentTarget || e.delegateTarget;
		let where = parseInt($(t).attr("data-where"))
		let l = this.length;
		let i = this.index;
		let next = where + i == l ? 0 : where + i < 0 ? l - 1 : where + i;
		s.turn(next);
	}
}

class Team{

	arrows: any;
	items: any;
	topics: any;
	topicIndex: number;
	itemIndex: number;
	dots: any;
	dotsWrap: any;
	photos: any;

	constructor(){

		this.arrows = $(".team .slider .arrow");
		this.dots = $(".team .slider .dot");
		this.dotsWrap = $(".team .slider .dots__inner");
		this.items = $(".team .slider .main__block");
		this.photos = $(".team .slider .right__inner");
		this.topics = $(".team .slider .topic");
		this.topicIndex = 1;
		this.itemIndex = 1;
		this.listen();

	}
	listen(){
		this.arrows.on("click", (e) => this.arrowClicked(e));
		this.dots.on("click", (e) => this.dotClicked(e));
		this.topics.on("click", (e) => this.topicClicked(e));
		this.topics[0].click()
	}
	arrowClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let where = parseInt($(t).attr("data-where"))
		let items = this.items.filter("[data-topic-index=" + this.topicIndex + "]");
		let l = items.length;
		let i = this.itemIndex;
		let next = where + i == l ? 0 : where + i < 0 ? l - 1 : where + i;
		this.turn(this.topicIndex, next);
	}
	topicClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let topicIndex = parseInt($(t).attr("data-topic-index"));
		this.turn(topicIndex, 0);
	}
	dotClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let itemIndex = parseInt($(t).attr("data-item-index"));
		this.turn(this.topicIndex, itemIndex);
	}
	getPhoto(topicIndex, itemIndex){
		return this.get(this.photos, topicIndex, itemIndex);
	}
	getDots(topicIndex){
		return this.dotsWrap.filter("[data-topic-index='" + topicIndex + "']")
	}
	getDot(topicIndex, itemIndex){
		return this.get(this.dots, topicIndex, itemIndex);
	}
	getItem(topicIndex, itemIndex){
		return this.get(this.items, topicIndex, itemIndex);
	}
	get(from, topicIndex, itemIndex){
		return from.filter("[data-topic-index='" + topicIndex + "'][data-item-index='" + itemIndex + "']");
	}
	turn(topicIndex, itemIndex){
		if (topicIndex != this.topicIndex || itemIndex != this.itemIndex){
			// change item
			let oldItem = this.getItem(this.topicIndex, this.itemIndex);
			let newItem = this.getItem(topicIndex, itemIndex);


			// change photo
			let oldPhoto = this.getPhoto(this.topicIndex, this.itemIndex);
			let newPhoto = this.getPhoto(topicIndex, itemIndex);

			// change dot
			let oldDot = this.getDot(this.topicIndex, this.itemIndex);
			let newDot = this.getDot(topicIndex, itemIndex);

			newPhoto.css("display", "flex").hide(0);
			oldItem.add(oldPhoto).fadeOut(300, ()=>{
				newItem.add(newPhoto).fadeIn();

				oldDot.removeClass("active");
				newDot.addClass("active");

				this.itemIndex = itemIndex;
			})

			// change topic
			if (topicIndex != this.topicIndex){
				$(this.topics[this.topicIndex]).removeClass("active");
				$(this.topics[topicIndex]).addClass("active");

				// change dots
				this.getDots(this.topicIndex).removeClass("active")
				this.getDots(topicIndex).addClass("active");

				this.topicIndex = topicIndex;
			}
		}
	}
}


class Media{

	posts: any;
	pages: any;
	arrows: any;
	pageItems: any;
	activeIndex: any;

	constructor(){
		this.posts = $(".media .block");
		this.pages = $(".media .pages");
		this.arrows = $(".media .controls .arrow");
		this.activeIndex = 0;
		this.paginate();
		this.hide();
		this.listen();
	}

	paginate(){
		let l = this.posts.length;
		this.pages.html("");
		for (let i = 0; i <= l%2; i++) {
			let active = "";
			if (i == 0)
				active = "active"
			this.pages.append('<span class="tt-m ' + active + '">' + (i+1) + '</span>');
		}
		this.pageItems = this.pages.find("span");
	}
	hide(){
		this.posts.filter(":gt(1)").css("display", "none");
	}
	turn(to){
		this.posts.eq(this.activeIndex*2).add(this.posts.eq(this.activeIndex*2+1)).css("display", "none");
		this.posts.eq(to*2).add(this.posts.eq(to*2+1)).css("display", "block");

		this.pageItems.removeClass("active");
		$(this.pageItems[to]).addClass("active");
		this.activeIndex = to;
	}
	pageClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let index = $(t).index();
		let pageIndex = index%2;
		if(this.activeIndex != pageIndex)
			this.turn(pageIndex);
	}
	arrowClicked(e){
		let t = e.currentTarget || e.delegateTarget;
		let where = parseInt($(t).attr("data-where"))
		let l = this.posts.length%2+1;
		let i = this.activeIndex;
		let next = where + i == l ? 0 : where + i < 0 ? l - 1 : where + i;
		this.turn(next);

	}
	listen(){
		this.pages.delegate("span", "click", (e) => { this.pageClicked(e) });
		this.arrows.on("click", (e) => { this.arrowClicked(e) })
	}
}

var join = {

	patterns: {
		mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	button: $(".footer .subscribe, .popup .button"),
	inputs: $("input[name='mail']"),
	focus: function() {
		this.style.border = "";
		if(this.value.trim() == $(this).attr("data-value"))
			this.value = "";
	},
	blur: function() {
		if(this.value.trim() == "")
			this.value = $(this).attr("data-value");
	},
	verify: function() {
		var mailS = join.input.val().trim();
		if (mailS == join.input.attr("data-value"))
			return false;
		return join.patterns.mail.test(mailS);
	},
	send: function(data) {
		$.post("/mail.php", data, function(r) {
			popup.hide();
			alert(join.input.attr("data-success"));
		});
	},
	clicked: function() {
		join.input = $(this).parents("form").find("input[name='mail']");
		if(join.verify()){
			join.send({"mail": join.input.val().trim()});
		}
		else
			join.input.css("border", "1px solid red");
	},
	listen: function() {
		this.inputs.on("focus", this.focus);
		this.inputs.on("blur", this.blur);
		this.button.on("click", this.clicked);
	}
}

var popup = {

	invoke: $(".participate"),
	hiding: $(".popup .cross"),
	form: $(".popup"),
	show: function(){
		popup.form.fadeIn();
	},
	hide: function(){
		popup.form.fadeOut();
	},
	listen: function(){
		this.invoke.on("click", this.show);
		this.hiding.on("click", this.hide);
	}
}

var video = {
	iframe: $(".video__frame"),
	button: $(".play"),
	clicked: function() {
		video.iframe[0].onload = function() {
			video.play();
			video.iframe.fadeIn();
		}
		video.iframe[0].src = video.iframe.attr("data-src");
	},
	play: function() {
		video.iframe[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
	},
	listen: function() {
		this.button.on("click", this.clicked);
	}
}


var menu = {

	items: $(".menu__item"),
	invoke: $(".menu__svg"),
	hiding: $(".menu .cross"),
	wrap: $(".menu"),
	clicked: function(e){
		var href = $(this).attr("href");
		menu.items.removeClass("active");
		$(this).addClass("active");
		if (href[0] == "#"){
			e.preventDefault();
			$("html, body").animate({"scrollTop": $(href).offset().top}, "slow");
			if ($(".menu .cross").css("display") == "block")
				menu.hide();
			return false;
		}
		return true;
	},
	show: function(){
		menu.wrap.css("display", "flex").hide();
		menu.wrap.fadeIn();
	},
	hide: function(){
		menu.wrap.fadeOut();
	},
	listen: function(){
		this.items.on("click", this.clicked);
		this.invoke.on("click", this.show);
		this.hiding.on("click", this.hide);
	}
}


let s = new Slider()
let t = new Team()
let m = new Media()
join.listen();
video.listen();
popup.listen();
menu.listen();