<div data-component="category/dropdown" class="dropdown d-inline-block category-dropdown-container bottom-sheet <!-- IF !categories.length -->hidden<!-- ENDIF !categories.length -->">
    <button type="button" class="btn btn-light" data-toggle="dropdown">
        <span data-component="category/dropdown/selected">
        <!-- IF selectedCategory --><span class="fa-stack" style="{function.generateCategoryBackground, selectedCategory}"><i class="fa fa-fw fa-stack-1x {selectedCategory.icon}" style="color: {selectedCategory.color};"></i></span> {selectedCategory.name}<!-- ELSE -->
        [[unread:all-categories]]<!-- ENDIF selectedCategory --> <i class="fa fa-chevron-down"></i>
        </span>
        <input data-component="category-selector-search" type="text" class="form-control form-control-sm hidden" autocomplete="off">
    </button>
    <div data-component="category/list" class="dropdown-menu dropdown-menu-right category-dropdown-menu" role="menu">
        <a class="dropdown-item" href="{config.relative_path}/{allCategoriesUrl}"><i class="fa fa-fw <!-- IF !selectedCategory -->fa-check<!-- ENDIF !selectedCategory -->"></i> [[unread:all-categories]]</a>
        {{{each categories}}}
        <a class="dropdown-item" href="#" data-cid="{categories.cid}" data-parent-cid="{categories.parentCid}" data-name="{categories.name}">{categories.level}<i data-component="category/select/icon" class="fa fa-fw <!-- IF categories.selected -->fa-check<!-- ENDIF categories.selected -->"></i><span data-component="category-markup"><!-- IF categories.icon --><span class="fa-stack" style="{function.generateCategoryBackground}"><i class="fa fa-fw fa-stack-1x {categories.icon}" style="color: {categories.color};"></i></span><!-- ENDIF categories.icon --> {categories.name}</span></a>
        {{{end}}}
    </div>
</div>