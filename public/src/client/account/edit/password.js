
define('forum/account/edit/password', ['forum/account/header', 'translator', 'api'], function (header, translator, api) {
	var AccountEditPassword = {};
	var zxcvbn;
	AccountEditPassword.init = async function () {
		zxcvbn = (await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')).default;
		header.init();

		handlePasswordChange();
	};

	function handlePasswordChange() {
		var currentPassword = $('#inputCurrentPassword');
		var password_notify = $('#password-notify');
		var password_confirm_notify = $('#password-confirm-notify');
		var password = $('#inputNewPassword');
		var password_confirm = $('#inputNewPasswordAgain');
		var passwordvalid = false;
		var passwordsmatch = false;

		function onPasswordChanged() {
			var passwordStrength = zxcvbn(password.val());
			passwordvalid = false;
			if (password.val().length < ajaxify.data.minimumPasswordLength) {
				showError(password_notify, '[[reset-password:password-too-short]]');
			} else if (password.val().length > 512) {
				showError(password_notify, '[[error:password-too-long]]');
			} else if (!utils.isPasswordValid(password.val())) {
				showError(password_notify, '[[user:change-password-error]]');
			} else if (password.val() === ajaxify.data.username) {
				showError(password_notify, '[[user:password-same-as-username]]');
			} else if (password.val() === ajaxify.data.email) {
				showError(password_notify, '[[user:password-same-as-email]]');
			} else if (passwordStrength.score < ajaxify.data.minimumPasswordStrength) {
				showError(password_notify, '[[user:weak-password]]');
			} else {
				showSuccess(password_notify);
				passwordvalid = true;
			}
		}

		function onPasswordConfirmChanged() {
			if (password.val() !== password_confirm.val()) {
				showError(password_confirm_notify, '[[user:change-password-error-match]]');
				passwordsmatch = false;
			} else {
				if (password.val()) {
					showSuccess(password_confirm_notify);
				} else {
					password_confirm_notify.parent().removeClass('alert-success alert-danger');
					password_confirm_notify.children().show();
					password_confirm_notify.find('.msg').html('');
				}

				passwordsmatch = true;
			}
		}

		password.on('blur', onPasswordChanged);
		password_confirm.on('blur', onPasswordConfirmChanged);

		$('#changePasswordBtn').on('click', function () {
			onPasswordChanged();
			onPasswordConfirmChanged();

			var btn = $(this);
			if (passwordvalid && passwordsmatch) {
				btn.addClass('disabled').find('i').removeClass('hide');
				api.put('/users/' + ajaxify.data.theirid + '/password', {
					currentPassword: currentPassword.val(),
					newPassword: password.val(),
				}, () => {
					if (parseInt(app.user.uid, 10) === parseInt(ajaxify.data.uid, 10)) {
						window.location.href = config.relative_path + '/login';
					} else {
						ajaxify.go('user/' + ajaxify.data.userslug + '/edit');
					}
				}, err => app.alertError(err.status.message)).always(() => {
					btn.removeClass('disabled').find('i').addClass('hide');
					currentPassword.val('');
					password.val('');
					password_confirm.val('');
					password_notify.parent().removeClass('show-success show-danger');
					password_confirm_notify.parent().removeClass('show-success show-danger');
					passwordsmatch = false;
					passwordvalid = false;
				});
			} else {
				if (!passwordsmatch) {
					app.alertError('[[user:change-password-error-match]]');
				}

				if (!passwordvalid) {
					app.alertError('[[user:change-password-error]]');
				}
			}
			return false;
		});
	}

	function showError(element, msg) {
		translator.translate(msg, function (msg) {
			element.html(msg);

			element.parent()
				.removeClass('show-success')
				.addClass('show-danger');
		});
	}

	function showSuccess(element) {
		element.html('');
		element.parent()
			.removeClass('show-danger')
			.addClass('show-success');
	}

	return AccountEditPassword;
});
