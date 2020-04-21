<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="recent">
	<div class="clearfix">
		<div class="float-left">
			<!-- IMPORT partials/buttons/new-topic.tpl -->

			<a href="{config.relative_path}/{selectedFilter.url}" class="d-inline-block">
				<div id="new-topics-alert" class="alert alert-warning hidden"></div>
			</a>
		</div>
		<div class="float-right">
		<!-- IMPORT partials/topic-filter.tpl -->
		<!-- IMPORT partials/category-filter.tpl -->
		</div>
	</div>

	<hr class="d-none d-md-block"/>

	<div class="category">
		<!-- IF !topics.length -->
		<div class="alert alert-warning" id="category-no-topics">[[recent:no_recent_topics]]</div>
		<!-- ENDIF !topics.length -->

		<!-- IMPORT partials/topics-list.tpl -->

		<!-- IF config.usePagination -->
		<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
</div>
