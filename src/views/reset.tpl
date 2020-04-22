<!-- IMPORT partials/breadcrumbs.tpl -->


<div class="alert alert-info">
	[[reset-password:enter-email]]
</div>

<div class="well">
	<div class="alert alert-success hide" id="success">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		[[reset-password:password-reset-sent]]
	</div>
	<div class="alert alert-danger hide" id="error">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		[[reset-password:invalid-email]]
	</div>
	<form onsubmit="return false;">
		<input type="text" class="form-control input-block input-lg" placeholder="[[reset-password:enter-email-address]]" id="email" />

		<br />
		<button class="btn btn-primary btn-block btn-lg" id="reset" type="submit">[[reset-password:reset-password]]</button>
	</form>
</div>
