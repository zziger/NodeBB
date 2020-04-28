<div data-component="topic/deleted/message" class="alert alert-warning clearfix" {{{if !deleted}}}style="display: none;"{{{end}}}>
    <span class="pull-left">[[topic:deleted-message]]</span>
    <span class="pull-right">
        <!-- IF deleter -->
        <a href="{config.relative_path}/user/{deleter.userslug}">
            <strong>{deleter.username}</strong>
        </a>
        <small class="timeago" title="{deletedTimestampISO}"></small>
        <!-- ENDIF deleter -->
    </span>
</div>