$(document).ready(function () {
	'use strict'

	var login = {
		$: {
    		user_name: $('#user_name')
	      , passw:     $('#passw')
	    }
	}

	login.clear = function () {
		this.$.user_name.val('')
		this.$.passw.val('')
		return this
	}
	login.bind = function () { this.clear(); this.$.user_name.focus() }

	$('#login-form').on('submit', function (ev) {
		var xhr = new XMLHttpRequest

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log(xhr.status)
				console.log(xhr.responseText)
			}
		}

		xhr.open('POST', '/xhr')
		xhr.setRequestHeader('content-type', 'application/json')
		xhr.send(JSON.stringify({
			user_name: login.$.user_name.val()
		  , passw: login.$.passw.val()
		}))

		login.bind()
	})


	login.bind()
})
