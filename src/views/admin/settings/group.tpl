<!-- IMPORT admin/partials/settings/header.tpl -->

<form role="form">
	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/group:general]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" id="allowPrivateGroups" data-field="allowPrivateGroups">
				<label class="form-check-label" for="allowPrivateGroups">[[admin/settings/group:private-groups]]</label>
				<small class="form-text text-muted">
					[[admin/settings/group:private-groups.help]]<br />
					[[admin/settings/group:private-groups.warning]]
				</small>
			</div>

			<div class="form-group form-check">
				<input type="checkbox" class="form-check-input" id="allowMultipleBadges" data-field="allowMultipleBadges">
				<label class="form-check-label" for="allowMultipleBadges">[[admin/settings/group:allow-multiple-badges]]</label>
				<small class="form-text text-muted">[[admin/settings/group:allow-multiple-badges-help]]</small>
			</div>

			<div class="form-group">
				<label for="maximumGroupNameLength">[[admin/settings/group:max-name-length]]</label>
				<input class="form-control" type="text" placeholder="255" data-field="maximumGroupNameLength" id="maximumGroupNameLength" />
			</div>

			<div class="form-group">
				<label for="maximumGroupTitleLength">[[admin/settings/group:max-title-length]]</label>
				<input class="form-control" type="text" placeholder="40" data-field="maximumGroupTitleLength" id="maximumGroupTitleLength" />
			</div>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/group:cover-image]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-group">
				<label for="groups:defaultCovers">[[admin/settings/group:default-cover]]</label>
				<input type="text" class="form-control input-lg" id="groups:defaultCovers" data-field="groups:defaultCovers" data-field-type="tagsinput" value="/assets/images/cover-default.png" placeholder="https://example.com/group1.png, https://example.com/group2.png" /><br />
				<small class="form-text text-muted">[[admin/settings/group:default-cover-help]]</small>
			</div>
		</div>
	</div>
</form>

<!-- IMPORT admin/partials/settings/footer.tpl -->