<!-- IMPORT admin/partials/settings/header.tpl -->

<form role="form">
	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:authentication]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="requireEmailConfirmation" id="requireEmailConfirmation">
				<label class="form-check-label" for="requireEmailConfirmation">[[admin/settings/user:require-email-confirmation]]</label>
			</div>

			<div class="form-group form-inline">
				<label for="emailConfirmInterval">[[admin/settings/user:email-confirm-interval]]</label>
				<input class="form-control" data-field="emailConfirmInterval" type="number" id="emailConfirmInterval" placeholder="Default: 10"
					value="10" />
				<label for="emailConfirmInterval">[[admin/settings/user:email-confirm-email2]]</label>
			</div>

			<div class="form-group">
				<label for="allowLoginWith">[[admin/settings/user:allow-login-with]]</label>
				<select class="form-control" data-field="allowLoginWith" id="allowLoginWith">
					<option value="username-email">[[admin/settings/user:allow-login-with.username-email]]</option>
					<option value="username">[[admin/settings/user:allow-login-with.username]]</option>
					<option value="email">[[admin/settings/user:allow-login-with.email]]</option>
				</select>
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:account-settings]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="gdpr_enabled" id="gdpr_enabled">
				<label class="form-check-label" for="gdpr_enabled">[[admin/settings/user:gdpr-enabled]]</label>
				<small class="form-text text-muted">[[admin/settings/user:gdpr-enabled-help]]</small>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="username:disableEdit" id="username:disableEdit">
				<label class="form-check-label" for="username:disableEdit">[[admin/settings/user:disable-username-changes]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="email:disableEdit" id="email:disableEdit">
				<label class="form-check-label" for="email:disableEdit">[[admin/settings/user:disable-email-changes]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="password:disableEdit" id="password:disableEdit">
				<label class="form-check-label" for="password:disableEdit">[[admin/settings/user:disable-password-changes]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="allowAccountDelete" id="allowAccountDelete">
				<label class="form-check-label" for="allowAccountDelete">[[admin/settings/user:allow-account-deletion]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="hideFullname" id="hideFullname">
				<label class="form-check-label" for="hideFullname">[[admin/settings/user:hide-fullname]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="hideEmail" id="hideEmail">
				<label class="form-check-label" for="hideEmail">[[admin/settings/user:hide-email]]</label>
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:themes]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="disableCustomUserSkins" id="disableCustomUserSkins">
				<label class="form-check-label" for="disableCustomUserSkins">[[admin/settings/user:disable-user-skins]]</label>
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:account-protection]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group">
				<label for="adminReloginDuration">[[admin/settings/user:admin-relogin-duration]]</label>
				<input data-field="adminReloginDuration" type="text" class="form-control" data-field="adminReloginDuration" placeholder="60" />
				<small class="form-text text-muted">[[admin/settings/user:admin-relogin-duration-help]]</small>
			</div>
			<div class="form-group">
				<label for="loginAttempts">[[admin/settings/user:login-attempts]]</label>
				<input data-field="loginAttempts" type="text" class="form-control" data-field="loginAttempts" placeholder="5" />
				<small class="form-text text-muted">[[admin/settings/user:login-attempts-help]]</small>
			</div>
			<div class="form-group">
				<label for="lockoutDuration">[[admin/settings/user:lockout-duration]]</label>
				<input data-field="lockoutDuration" type="text" class="form-control" data-field="lockoutDuration" placeholder="60" />
			</div>
			<div class="form-group">
				<label for="passwordExpiryDays">[[admin/settings/user:password-expiry-days]]</label>
				<input type="text" class="form-control" id="passwordExpiryDays" data-field="passwordExpiryDays" placeholder="0" />
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">
			[[admin/settings/user:session-time]]
		</div>
		<div class="col-sm-10 col-12">
			<div class="row mb-4">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="loginDays">[[admin/settings/user:session-time-days]]</label>
						<input type="text" id="loginDays" class="form-control" data-field="loginDays" placeholder="[[admin/settings/user:session-time-days]]" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="loginSeconds">[[admin/settings/user:session-time-seconds]]</label>
						<input type="text" id="loginSeconds" class="form-control" data-field="loginSeconds" placeholder="[[admin/settings/user:session-time-seconds]]" />
					</div>
				</div>
				<div class="col-12">
					<small class="form-text text-muted">[[admin/settings/user:session-time-help]]</small>
				</div>
			</div>
			<div class="form-group">
				<label for="onlineCutoff">[[admin/settings/user:online-cutoff]]</label>
				<input type="text" id="onlineCutoff" class="form-control" data-field="onlineCutoff">
				<small class="form-text text-muted">[[admin/settings/user:online-cutoff-help]]</small>
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:registration]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="registrationType">[[admin/settings/user:registration-type]]</label>
					<small class="form-text text-muted">[[admin/settings/user:registration-type.help, {config.relative_path}]]</small>
				</div>
				<div class="form-group col-5 col-md-3">
					<select id="registrationType" class="form-control" data-field="registrationType">
						<option value="normal">[[admin/settings/user:registration-type.normal]]</option>
						<option value="invite-only">[[admin/settings/user:registration-type.invite-only]]</option>
						<option value="admin-invite-only">[[admin/settings/user:registration-type.admin-invite-only]]</option>
						<option value="disabled">[[admin/settings/user:registration-type.disabled]]</option>
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="registrationApprovalType">[[admin/settings/user:registration-approval-type]]</label>
					<small class="form-text text-muted">[[admin/settings/user:registration-approval-type.help, {config.relative_path}]]</small>
				</div>
				<div class="form-group col-5 col-md-3">
					<select class="form-control" id="registrationApprovalType" data-field="registrationApprovalType">
						<option value="normal">[[admin/settings/user:registration-type.normal]]</option>
						<option value="admin-approval">[[admin/settings/user:registration-type.admin-approval]]</option>
						<option value="admin-approval-ip">[[admin/settings/user:registration-type.admin-approval-ip]]</option>
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="maximumInvites">[[admin/settings/user:max-invites]]</label>
					<small class="form-text text-muted">[[admin/settings/user:max-invites-help]]</small>
				</div>
				<div class="form-group col-5 col-md-3">
					<input id="maximumInvites" type="number" class="form-control" data-field="maximumInvites" placeholder="0">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="inviteExpiration">[[admin/settings/user:invite-expiration]]</label>
					<small class="form-text text-muted">[[admin/settings/user:invite-expiration-help]]</small>
				</div>
				<div class="form-group col-5 col-md-3">
					<input type="number" class="form-control" id="inviteExpiration" data-field="inviteExpiration" placeholder="7">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="minimumUsernameLength">[[admin/settings/user:min-username-length]]</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<input type="text" id="minimumUsernameLength" class="form-control" value="2" data-field="minimumUsernameLength">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="maximumUsernameLength">[[admin/settings/user:max-username-length]]</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<input type="text" id="maximumUsernameLength" class="form-control" value="16" data-field="maximumUsernameLength">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="minimumPasswordLength">[[admin/settings/user:min-password-length]]</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<input id="minimumPasswordLength" type="text" class="form-control" value="6" data-field="minimumPasswordLength">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-12 col-md-5">
					<label for="minimumPasswordStrength">[[admin/settings/user:min-password-strength]]</label>
				</div>
				<div class="form-group col-12 col-md-7">
					<select class="form-control" id="minimumPasswordStrength" data-field="minimumPasswordStrength">
						<option value="0">0 - too guessable: risky password</option>
						<option value="1">1 - very guessable</option>
						<option value="2">2 - somewhat guessable</option>
						<option value="3">3 - safely unguessable</option>
						<option value="4">4 - very unguessable</option>
					</select>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="maximumAboutMeLength">[[admin/settings/user:max-about-me-length]]</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<input type="text" id="maximumAboutMeLength" class="form-control" value="500" data-field="maximumAboutMeLength">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="termsOfUse">[[admin/settings/user:terms-of-use]]</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<textarea id="termsOfUse" class="form-control" data-field="termsOfUse"></textarea>
				</div>
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:user-search]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group">
				<label for="userSearchResultsPerPage">[[admin/settings/user:user-search-results-per-page]]</label>
				<input id="userSearchResultsPerPage" type="text" class="form-control" value="24" data-field="userSearchResultsPerPage">
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:default-user-settings]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="showemail" id="showemail">
				<label class="form-check-label" for="showemail">[[admin/settings/user:show-email]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="showfullname" id="showfullname">
				<label class="form-check-label" for="showfullname">[[admin/settings/user:show-fullname]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="restrictChat" id="restrictChat">
				<label class="form-check-label" for="restrictChat">[[admin/settings/user:restrict-chat]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="openOutgoingLinksInNewTab" id="openOutgoingLinksInNewTab">
				<label class="form-check-label" for="openOutgoingLinksInNewTab">[[admin/settings/user:outgoing-new-tab]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="topicSearchEnabled" id="topicSearchEnabled">
				<label class="form-check-label" for="topicSearchEnabled">[[admin/settings/user:topic-search]]</label>
			</div>

			<div class="form-group">
				<label for="dailyDigestFreq">[[admin/settings/user:digest-freq]]</label>
				<select id="dailyDigestFreq" class="form-control" data-field="dailyDigestFreq">
					<option value="off">[[admin/settings/user:digest-freq.off]]</option>
					<option value="day">[[admin/settings/user:digest-freq.daily]]</option>
					<option value="week">[[admin/settings/user:digest-freq.weekly]]</option>
					<option value="month">[[admin/settings/user:digest-freq.monthly]]</option>
				</select>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="followTopicsOnCreate" id="followTopicsOnCreate">
				<label class="form-check-label" for="followTopicsOnCreate">[[admin/settings/user:follow-created-topics]]</label>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" data-field="followTopicsOnReply" id="followTopicsOnReply">
				<label class="form-check-label" for="followTopicsOnReply">[[admin/settings/user:follow-replied-topics]]</label>
			</div>

			<div class="form-group">
				<label for="categoryWatchState">[[admin/settings/user:categoryWatchState]]</label>
				<select id="categoryWatchState" class="form-control" data-field="categoryWatchState">
					<option value="watching">[[admin/settings/user:categoryWatchState.watching]]</option>
					<option value="notwatching">[[admin/settings/user:categoryWatchState.notwatching]]</option>
					<option value="ignoring">[[admin/settings/user:categoryWatchState.ignoring]]</option>
				</select>
			</div>
		</div>
	</div>
	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/user:default-notification-settings]]</div>
		<div class="col-sm-10 col-12">
			<!-- BEGIN notificationSettings -->
			<div class="form-row">
				<div class="form-group col-7 col-md-9">
					<label for="notificationSettings">{notificationSettings.label}</label>
				</div>
				<div class="form-group col-5 col-md-3">
					<select class="form-control" id="notificationSettings" data-field="{notificationSettings.name}">
						<option value="none">[[notifications:none]]</option>
						<option value="notification">[[notifications:notification_only]]</option>
						<option value="email">[[notifications:email_only]]</option>
						<option value="notificationemail">[[notifications:notification_and_email]]</option>
					</select>
				</div>
			</div>
			<!-- END notificationSettings -->
		</div>
	</div>
</form>

<!-- IMPORT admin/partials/settings/footer.tpl -->