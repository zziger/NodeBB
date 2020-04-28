<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="tag">
	<div class="clearfix">
		<div class="float-left">
			<!-- IMPORT partials/buttons/new-topic.tpl -->
		</div>
	</div>

	<hr class="d-none d-md-block"/>

	<div class="category">
		<!-- IF !topics.length -->
		<div class="alert alert-warning">[[tags:no-tag-topics]]</div>
		<!-- ENDIF !topics.length -->

		<!-- IMPORT partials/topics-list.tpl -->

		<button id="load-more-btn" class="btn btn-primary hidden">[[unread:load-more]]</button>
		<!-- IF config.usePagination -->
			<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
</div>
