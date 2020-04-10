<div data-component="topic/reply/container" class="btn-group action-bar bottom-sheet" {{{if !privileges.topics:reply}}}style="display: none;"{{{end}}}>
	<a href="{config.relative_path}/compose?tid={tid}&title={title}" class="btn btn-primary" data-component="topic/reply" data-ajaxify="false" role="button"><i class="fa fa-reply visible-xs-inline"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"> [[topic:reply]]</span></a>
	<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu pull-right" role="menu">
		<li><a href="#" data-component="topic/reply-as-topic">[[topic:reply-as-topic]]</a></li>
	</ul>
</div>

{{{if !privileges:topics:reply}}}
{{{if loggedIn}}}
<a data-component="topic/reply/locked" class="btn btn-primary" {{{if !locked}}}style="display: none;"{{{end}}} disabled><i class="fa fa-lock"></i> [[topic:locked]]</a>
{{{else}}}
<a data-component="topic/reply/guest" href="{config.relative_path}/login" class="btn btn-primary">[[topic:guest-login-reply]]</a>
{{{end}}}
{{{end}}}