<!-- IMPORT partials/breadcrumbs.tpl -->

<!-- IF valid -->
<div class="well">
	<!-- IF displayExpiryNotice -->
	<div class="alert alert-warning">
		[[reset-password:password-expired]]
	</div>
	<!-- ENDIF displayExpiryNotice -->
	<div class="alert alert-success hidden" id="success">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		<strong>[[reset-password:password-changed.title]]</strong>
		<p>[[reset-password:password-changed.message]]</p>
	</div>
	<div class="alert alert-warning hidden" id="notice">
		<strong></strong>
		<p></p>
	</div>
	<form onsubmit="return false;" id="reset-form" class="row">
		<div class="col-sm-6">
			<label for="password">[[reset-password:new-password]]</label>
			<input class="form-control" type="password" placeholder="[[reset-password:new-password]]" id="password" /><br />
		</div>
		<div class="col-sm-6">
			<label for="repeat">[[reset-password:repeat-password]]</label>
			<input class="form-control" type="password" placeholder="[[reset-password:repeat-password]]" id="repeat" /><br />
		</div>
		<div class="col-xs-12">
			<button class="btn btn-primary btn-block" id="reset" type="submit">[[reset-password:reset-password]]</button>
		</div>
	</form>
</div>
<!-- ELSE -->
<div class="panel panel-default panel-danger">
	<div class="panel-heading">
		<h3 class="panel-title">[[reset-password:wrong-reset-code.title]]</h3>
	</div>
	<div class="panel-body">
		<p>[[reset-password:wrong-reset-code.message]]</p>
	</div>
</div>
<!-- ENDIF valid -->