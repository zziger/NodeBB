<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="unread">
	<div class="clearfix">
		<div class="float-left">
			<!-- IMPORT partials/buttons/new-topic.tpl -->
			<a href="{config.relative_path}/{selectedFilter.url}{querystring}" class="inline-block">
				<div class="alert alert-warning hidden" id="new-topics-alert"></div>
			</a>
		</div>
		<div class="float-right">
			<!-- IMPORT partials/topic-filter.tpl -->
			<!-- IMPORT partials/category-filter.tpl -->
			<!-- IMPORT partials/mark-read.tpl -->
		</div>
	</div>

	<hr class="d-none d-md-block"/>

	<div class="category">
		<div id="category-no-topics" class="alert alert-warning <!-- IF topics.length -->hidden<!-- ENDIF topics.length -->">[[unread:no-unread-topics]]</div>

		<!-- IMPORT partials/topics-list.tpl -->
		<button id="load-more-btn" class="btn btn-primary hidden">[[unread:load-more]]</button>
		<!-- IF config.usePagination -->
			<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
</div>
