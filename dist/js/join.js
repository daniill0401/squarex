;(function() {


	var join = {

		patterns: {
			mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		},
		button: $(".footer .subscribe"),
		input: $(".footer .subscribe"),
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
			return join.patterns.mail.test(mailS);
		},
		send: function(data) {
			$.post("/mail.php", data, function(r) {
				alert(join.input.attr("data-success"));
			});
		},
		clicked: function() {
			if(join.verify()){
				join.send({"mail": join.input.val().trim()});
			}
			else
				join.input.css("border", "1px solid red");
		},
		listen: function() {
			this.input.on("focus", this.focus);
			this.input.on("blur", this.blur);
			this.button.on("click", this.clicked);
		}
	}

	$(window).on("load", function() {
		join.listen();
	});

})()