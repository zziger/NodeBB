<!-- IF privileges.editable -->
<div class="btn-group topic-tools bottom-sheet">
	<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
		<span class="visible-sm-inline visible-md-inline visible-lg-inline">[[topic:tools.title]]</span>
		<span class="visible-xs-inline"><i class="fa fa-fw fa-gear"></i></span>
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu pull-right">
		<li>
			<a data-component="topic/mark-unread-for-all" href="#">
				<i class="fa fa-fw fa-inbox"></i> [[topic:tools.markAsUnreadForAll]]
			</a>
		</li>
		<li>
			<a data-component="topic/pin" href="#">
				<i class="fa fa-fw fa-thumb-tack"></i> [[topic:tools.pin]]
			</a>
		</li>
		<li>
			<a data-component="topic/unpin" href="#" class="hidden">
				<i class="fa fa-fw fa-thumb-tack fa-rotate-90"></i> [[topic:tools.unpin]]
			</a>
		</li>

		<li>
			<a data-component="topic/lock" href="#">
				<i class="fa fa-fw fa-lock"></i> [[topic:tools.lock]]
			</a>
		</li>
		<li>
			<a data-component="topic/unlock" href="#" class="hidden">
				<i class="fa fa-fw fa-unlock"></i> [[topic:tools.unlock]]
			</a>
		</li>

		<li class="divider"></li>

		<li>
			<a data-component="topic/move" href="#">
				<i class="fa fa-fw fa-arrows"></i> [[topic:tools.move]]
			</a>
		</li>
		<li>
			<a data-component="topic/move-all" href="#">
				<i class="fa fa-fw fa-arrows"></i> [[topic:tools.move-all]]
			</a>
		</li>
		<li>
			<a data-component="topic/merge" href="#">
				<i class="fa fa-fw fa-code-fork"></i> [[topic:tools.merge]]
			</a>
		</li>

		<li class="divider"></li>

		<li>
			<a data-component="topic/delete" href="#">
				<i class="fa fa-fw fa-trash-o"></i> [[topic:tools.delete]]
			</a>
		</li>
		<li>
			<a data-component="topic/restore" href="#" class="hidden">
				<i class="fa fa-fw fa-history"></i> [[topic:tools.restore]]
			</a>
		</li>
		<li>
			<a data-component="topic/purge" href="#" class="hidden">
				<i class="fa fa-fw fa-eraser"></i> [[topic:tools.purge]]
			</a>
		</li>

		{{{each topic_tools}}}
		<li>
			<a href="#" class="{topic_tools.class}"><i class="fa fa-fw {topic_tools.icon}"></i> {topic_tools.title}</a>
		</li>
		{{{end}}}
	</ul>
</div>
<!-- ENDIF privileges.editable -->