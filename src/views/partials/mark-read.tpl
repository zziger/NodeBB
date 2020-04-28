<div class="dropdown markread d-inline-block category-dropdown-container bottom-sheet<!-- IF !topics.length --> hidden<!-- ENDIF !topics.length -->">
    <button type="button" class="btn btn-light" data-toggle="dropdown">
        [[unread:mark-as-read]] <i class="fa fa-chevron-down"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-right category-dropdown-menu" role="menu">
        <a id="markSelectedRead" class="dropdown-item" tabindex="-1" href="#">[[unread:selected]]</a>
        <a id="markAllRead" class="dropdown-item" tabindex="-1" href="#">[[unread:all]]</a>

        <div class="dropdown-divider"></div>

        {{{each categories}}}
        <a class="category dropdown-item" data-cid="{categories.cid}" href="#">{categories.level}<!-- IF categories.icon --><span class="fa-stack" style="{function.generateCategoryBackground}"><i class="fa fa-fw fa-stack-1x {categories.icon}" style="color: {categories.color};"></i></span><!-- ENDIF categories.icon --> {categories.name}</a>
        {{{end}}}
    </div>
</div>