<!-- IF breadcrumbs.length -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb" itemscope="itemscope" itemprop="breadcrumb" itemtype="http://schema.org/BreadcrumbList">
		{{{each breadcrumbs}}}
		<li{{{if @last}}} data-component="breadcrumb/current" class="active breadcrumb-item"{{{else}}} class="breadcrumb-item"{{{end}}} itemscope="itemscope" itemprop="itemListElement" itemtype="http://schema.org/ListItem">
			<meta itemprop="position" content="@index" />
			{{{if !@last}}}<a href="{breadcrumbs.url}" itemprop="item">{{{end}}}
				<span itemprop="name">
					{breadcrumbs.text}
					{{{if @last}}}
					{{{if !feeds:disableRSS}}}
					{{{if rssFeedUrl}}}<a target="_blank" href="{rssFeedUrl}" itemprop="item"><i class="fa fa-rss-square"></i></a>{{{end}}}{{{end}}}
					{{{end}}}
				</span>
			{{{if !@last}}}</a>{{{end}}}
		</li>
		{{{end}}}
	</ol>
</nav>
<!-- ENDIF breadcrumbs.length -->
