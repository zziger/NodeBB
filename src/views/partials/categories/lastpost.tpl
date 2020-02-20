<!--
	Added/Changed:
	Removed:
	  - .card class usage with coloured left border (from persona)
-->
<div>
	{{{each ./posts}}}
	<!-- IF @first -->
	<div component="category/posts">
		<p>
			<a href="{config.relative_path}/user/{../user.userslug}">{buildAvatar(posts.user, "sm", true)}</a>
			<a class="permalink" href="{config.relative_path}/topic/{../topic.slug}<!-- IF ../index -->/{../index}<!-- ENDIF ../index -->">
				<small class="timeago" title="{../timestampISO}"></small>
			</a>
		</p>
		<p>
			<small>{../content}</small>
		</p>
	</div>
	<!-- ENDIF @first -->
	{{{end}}}

	<!-- IF !../posts.length -->
	<div component="category/posts">
		<div>
			<small>[[category:no_new_posts]]</small>
		</div>
	</div>
	<!-- ENDIF !../posts.length -->
</div>
