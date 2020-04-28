{{{if merger}}}
<div data-component="topic/merged/message" class="alert alert-warning clearfix">
    <span class="pull-left">[[topic:merged-message, {mergeIntoTid}, {merger.mergedIntoTitle}]]</span>
    <span class="pull-right">
        <a href="{config.relative_path}/user/{merger.userslug}">
            <strong>{merger.username}</strong>
        </a>
        <small class="timeago" title="{mergedTimestampISO}"></small>
    </span>
</div>
{{{end}}}