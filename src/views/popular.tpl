<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="popular">
	<div class="clearfix">
		<div class="float-left">
		<!-- IMPORT partials/buttons/new-topic.tpl -->
		</div>
		<div class="float-right">
		<!-- IMPORT partials/term-filter.tpl -->
		<!-- IMPORT partials/topic-filter.tpl -->
		<!-- IMPORT partials/category-filter.tpl -->
		</div>
	</div>

	<hr class="d-none d-md-block"/>

	<div class="category">
		<!-- IF !topics.length -->
		<div class="alert alert-warning" id="category-no-topics">[[recent:no-popular-topics]]</div>
		<!-- ENDIF !topics.length -->

		<!-- IMPORT partials/topics-list.tpl -->

		<!-- IF config.usePagination -->
		<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
</div>
