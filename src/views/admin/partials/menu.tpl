<nav>
	<ul class="nav nav-tabs mb-2">
		<div class="btn-group">
			<!-- IMPORT admin/partials/quick-actions/buttons.tpl -->
		</div>
		<!-- IMPORT admin/partials/quick-actions/alerts.tpl -->
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-general]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/general/dashboard">[[admin/menu:general/dashboard]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/general/homepage">[[admin/menu:general/homepage]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/general/navigation">[[admin/menu:general/navigation]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/general/languages">[[admin/menu:general/languages]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/general/social">[[admin/menu:general/social]]</a>
			</div>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-manage]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/manage/categories">[[admin/menu:manage/categories]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/privileges">[[admin/menu:manage/privileges]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/users">[[admin/menu:manage/users]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/admins-mods">[[admin/menu:manage/admins-mods]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/groups">[[admin/menu:manage/groups]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/tags">[[admin/menu:manage/tags]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/registration">[[admin/menu:manage/registration]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/post-queue">[[admin/menu:manage/post-queue]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/ip-blacklist">[[admin/menu:manage/ip-blacklist]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/uploads">[[admin/menu:manage/uploads]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/manage/digest">[[admin/menu:manage/digest]]</a>
			</div>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-settings]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/settings/general">[[admin/menu:section-general]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/user">[[admin/menu:settings/user]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/group">[[admin/menu:settings/group]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/tags">[[admin/menu:manage/tags]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/post">[[admin/menu:settings/post]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/email">[[admin/menu:settings/email]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/reputation">[[admin/menu:settings/reputation]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/guest">[[admin/menu:settings/guest]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/uploads">[[admin/menu:settings/uploads]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/chat">[[admin/menu:settings/chat]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/pagination">[[admin/menu:settings/pagination]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/notifications">[[admin/menu:settings/notifications]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/cookies">[[admin/menu:settings/cookies]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/web-crawler">[[admin/menu:settings/web-crawler]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/sockets">[[admin/menu:settings/sockets]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/settings/advanced">[[admin/menu:settings/advanced]]</a>
			</div>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-appearance]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/appearance/themes">[[admin/menu:appearance/themes]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/appearance/skins">[[admin/menu:appearance/skins]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/appearance/customise">[[admin/menu:appearance/customise]]</a>
			</div>
		</li>
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-extend]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/extend/plugins">[[admin/menu:extend/plugins]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/extend/widgets">[[admin/menu:extend/widgets]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/extend/rewards">[[admin/menu:extend/rewards]]</a>
			</div>
		</li>
		{{{if plugins.length}}}
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-plugins]]</a>
			<div class="dropdown-menu">
				{{{each plugins}}}<a class="dropdown-item" href="{relative_path}/admin{plugins.route}">{plugins.name}</a>{{{end}}}
			</div>
		</li>
		{{{end}}}
		{{{if authentication.length}}}
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-social-auth]]</a>
			<div class="dropdown-menu">
				{{{each authentication}}}<a class="dropdown-item" href="{relative_path}/admin{authentication.route}">{authentication.name}</a>{{{end}}}
			</div>
		</li>
		{{{end}}}
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">[[admin/menu:section-advanced]]</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="{relative_path}/admin/advanced/database">[[admin/menu:advanced/database]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/advanced/events">[[admin/menu:advanced/events]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/advanced/hooks">[[admin/menu:advanced/hooks]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/advanced/cache">[[admin/menu:advanced/cache]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/advanced/errors">[[admin/menu:advanced/errors]]</a>
				<a class="dropdown-item" href="{relative_path}/admin/advanced/logs">[[admin/menu:advanced/logs]]</a>
				{{{if env}}}
				<a class="dropdown-item" href="{relative_path}/admin/development/logger">[[admin/menu:development/logger]]</a>
				{{{end}}}
			</div>
		</li>
	</ul>
</nav>

<main id="panel">