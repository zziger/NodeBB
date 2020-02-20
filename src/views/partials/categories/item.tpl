<!--
	Added/Changed:
		- Using bootstrap card as main content container for the category li, w/ card-title, card-body, etc.
	Removed:
		- category icon (and background using style="{function.generateCategoryBackground}")
		- teaser timestamp visible only on mobile
-->
<li component="categories/category" data-cid="{../cid}" data-numRecentReplies="1" class="card mb-3">
	<meta itemprop="name" content="{../name}">

	<div class="row no-gutters">
		<div class="col-12 {{{ if config.hideCategoryLastPost }}}col-sm-10{{{ else }}}col-sm-7{{{ end }}}">
			<div class="card-body">
				<h4 class="card-title">
					<!-- IMPORT partials/categories/link.tpl -->
				</h4>
				<div>
					<!-- IF ../descriptionParsed -->
					<p class="card-text">
						{../descriptionParsed}
					</p>
					<!-- ENDIF ../descriptionParsed -->
					<!-- IF !config.hideSubCategories -->
					{function.generateChildrenCategories}
					<!-- ENDIF !config.hideSubCategories -->
				</div>
			</div>
		</div>

		{{{ IF !../link }}}
		<div class="col-md-1 d-none d-sm-block text-center text-uppercase align-self-center">
			<span class="{../unread-class} human-readable-number" title="{../totalTopicCount}">{../totalTopicCount}</span><br />
			<small class="text-muted">[[global:topics]]</small>
		</div>
		<div class="col-md-1 d-none d-sm-block text-center text-uppercase align-self-center">
			<span class="{../unread-class} human-readable-number" title="{../totalPostCount}">{../totalPostCount}</span><br />
			<small class="text-muted">[[global:posts]]</small>
		</div>
		{{{ if !config.hideCategoryLastPost }}}
		<div class="col-sm-3 d-none d-sm-block my-3" component="topic/teaser">
			<!-- IMPORT partials/categories/lastpost.tpl -->
		</div>
		{{{ end }}}
		{{{ end }}}
</li>
