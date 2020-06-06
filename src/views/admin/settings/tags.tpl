<!-- IMPORT admin/partials/settings/header.tpl -->

<form>
	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/tags:tag]]</div>
		<div class="col-sm-10 col-12">

			<div class="form-group">
				<a class="btn btn-primary" href="{config.relative_path}/admin/manage/tags">
					<i class="fa fa-external-link"></i>
					[[admin/settings/tags:link-to-manage]]
				</a>
			</div>
			<div class="form-group">
				<label for="minimumTagsPerTopics">[[admin/settings/tags:min-per-topic]]</label>
				<input id="minimumTagsPerTopics" type="text" class="form-control" value="0" data-field="minimumTagsPerTopic">
			</div>

			<div class="form-row">
				<div class="form-group col-md-9">
					<label for="maximumTagsPerTopics">[[admin/settings/tags:max-per-topic]]</label>
				</div>
				<div class="form-group col-md-3">
					<input id="maximumTagsPerTopics" type="text" class="form-control" value="5" data-field="maximumTagsPerTopic">
				</div>
			</div>

			<div class="form-row">
				<div class="form-group col-md-9">
					<label for="minimumTagLength">[[admin/settings/tags:min-length]]</label>
				</div>
				<div class="form-group col-md-3">
					<input id="minimumTagLength" type="text" class="form-control" value="3" data-field="minimumTagLength">
				</div>
			</div>

			<div class="form-row">
				<div class="form-group col-md-9">
					<label for="maximumTagLength">[[admin/settings/tags:max-length]]</label>
				</div>
				<div class="form-group col-md-3">
					<input id="maximumTagLength" type="text" class="form-control" value="15" data-field="maximumTagLength">
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="alert alert-secondary">
			<a href="{config.relative_path}/admin/manage/tags"><i class="fa fa-external-link"></i> [[admin/settings/tags:goto-manage]]</a>
		</div>
	</div>

	<div class="row mb-4">
		<div class="col-sm-2 col-12 settings-header">[[admin/settings/tags:related-topics]]</div>
		<div class="col-sm-10 col-12">
			<div class="form-row">
				<div class="form-group col-md-9">
					<label for="maximumRelatedTopics">[[admin/settings/tags:max-related-topics]]</label>
				</div>
				<div class="form-group col-md-3">
					<input id="maximumRelatedTopics" type="text" class="form-control" value="5" data-field="maximumRelatedTopics">
				</div>
			</div>
		</div>
	</div>
</form>

<!-- IMPORT admin/partials/settings/footer.tpl -->