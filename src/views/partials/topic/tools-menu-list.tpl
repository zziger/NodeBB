<!-- IF privileges.editable -->
<li <!-- IF locked -->hidden<!-- ENDIF locked -->><a data-component="topic/lock" href="#" class="<!-- IF locked -->hidden<!-- ENDIF locked -->"><i class="fa fa-fw fa-lock"></i> [[topic:tools.lock]]</a></li>
<li <!-- IF !locked -->hidden<!-- ENDIF !locked -->><a data-component="topic/unlock" href="#" class="<!-- IF !locked -->hidden<!-- ENDIF !locked -->"><i class="fa fa-fw fa-unlock"></i> [[topic:tools.unlock]]</a></li>
<li><a data-component="topic/move" href="#"><i class="fa fa-fw fa-arrows"></i> [[topic:tools.move]]</a></li>
<li><a data-component="topic/fork" href="#"><i class="fa fa-fw fa-code-fork"></i> [[topic:tools.fork]]</a></li>
<li <!-- IF pinned -->hidden<!-- ENDIF pinned -->><a data-component="topic/pin" href="#" class="<!-- IF pinned -->hidden<!-- ENDIF pinned -->"><i class="fa fa-fw fa-thumb-tack"></i> [[topic:tools.pin]]</a></li>
<li <!-- IF !pinned -->hidden<!-- ENDIF !pinned -->><a data-component="topic/unpin" href="#" class="<!-- IF !pinned -->hidden<!-- ENDIF !pinned -->"><i class="fa fa-fw fa-thumb-tack fa-rotate-90"></i> [[topic:tools.unpin]]</a></li>
<li><a data-component="topic/move-posts" href="#"><i class="fa fa-fw fa-arrows"></i> [[topic:tools.move-posts]]</a></li>
<li><a data-component="topic/mark-unread-for-all" href="#"><i class="fa fa-fw fa-inbox"></i> [[topic:tools.markAsUnreadForAll]]</a></li>
<li class="divider"></li>
<!-- ENDIF privileges.editable -->

<!-- IF privileges.deletable -->
<li <!-- IF deleted -->hidden<!-- ENDIF deleted -->><a data-component="topic/delete" href="#" class="<!-- IF deleted -->hidden<!-- ENDIF deleted -->"><i class="fa fa-fw fa-trash-o"></i> [[topic:tools.delete]]</a></li>
<li <!-- IF !deleted -->hidden<!-- ENDIF !deleted -->><a data-component="topic/restore" href="#" class="<!-- IF !deleted -->hidden<!-- ENDIF !deleted -->"><i class="fa fa-fw fa-history"></i> [[topic:tools.restore]]</a></li>
<!-- IF privileges.purge -->
<li <!-- IF !deleted -->hidden<!-- ENDIF !deleted -->><a data-component="topic/purge" href="#" class="<!-- IF !deleted -->hidden<!-- ENDIF !deleted -->"><i class="fa fa-fw fa-eraser"></i> [[topic:tools.purge]]</a></li>
<!-- END -->
<!-- IF privileges.isAdminOrMod -->
<li><a data-component="topic/delete/posts" href="#"><i class="fa fa-fw fa-trash-o"></i> [[topic:tools.delete-posts]]</a></li>
<!-- ENDIF privileges.isAdminOrMod -->

{{{each topic_tools}}}
<li><a href="#" class="{topic_tools.class}"><i class="fa fa-fw {topic_tools.icon}"></i> {topic_tools.title}</a></li>
{{{end}}}
<!-- ENDIF privileges.deletable -->